const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Event } = require('../../db/models');

require('dotenv');
const SerpApi = require('google-search-results-nodejs');
const { db } = require('../../config');
const event = require('../../db/models/event');
const search = new SerpApi.GoogleSearch(process.env.SERPAPI_TOKEN);

const router = express.Router();

// fetch all events
router.get('/', asyncHandler(async (req, res) => {
  const events = await Event.findAll();
  return res.json(events);
}))

// fetch events from a location
router.get('/:location/:type/:startDate/:endDate', asyncHandler(async (req, res) => {
  const { location, type, startDate, endDate } = req.params;

  // create the params for SerpApi
  const params = {
    engine: "google_events",
    q: `${type} events in ${location} ${startDate} to ${endDate}`,
    hl: "en",
    gl: "us",
    google_domain: "google.com",
    location
  };

  const resArray = [];

  // fetch a search to SerpApi and format the response
  const searchResponse = await search.json(params, async (data) => {
    // grab the events key in the json result
    const events = data.events_results;
    for (const index in events) {
      // console.log('EVENT: ', events[index])
      // format the date string into a format that the database accepts
      let dateStr = events[index].date.when;
      const year = new Date().getFullYear().toString();
      // console.log('dateStr', dateStr)
      let startDate;
      let endDate;

      if (!dateStr.includes('–')) {
        // only the start date and time is provided
        let startStr = dateStr.slice(5);
        const period = startStr.includes('AM') ? 'AM' : 'PM';
        // console.log('startStr', startStr)
        startStr = startStr.includes(':') ?
                    startStr :
                    startStr.slice(0, startStr.indexOf(period)-1) + ':00 ' + period;
        // console.log('startStr', startStr)
        startDate = new Date(year + startStr);
      } else {
        // start datetime and end datetime provided
        if (dateStr.match(/– [A-Z]/) || dateStr.match(/[A-Z][a-z]{2} [0-9]+ – [0-9]+/)) {
          // multi day events, i.e. "Sat, Aug 5, 6 PM - Sun, Aug 6, 1 AM"
          const dateStrSplit = dateStr.split('– ');

          if (!dateStr.match(/[AP]M/)) {
            // times not provided, i.e. Jul 21 - Aug 12
            let startingDate = events[index].date.start_date;
            let endingDate = dateStrSplit[1];
            let month = startingDate.slice(0, 4);
            startDate = new Date(year + startingDate);
            // console.log('NO MONTH STRING', year + month + endingDate)
            endDate = endingDate.match(/[A-Z]/) ?
                      new Date(year + endingDate.slice(5)) : // ending date has month (Aug 12)
                      new Date(year + month + endingDate); // no month (12)
          } else {
            //times provided
            dateStrSplit.forEach((oldString, i) => {
              // look for any times that wouldn't work with the JS date object
              // i.e., "6 PM" or "1 AM", must look like "6:00 PM" or "1:00" AM
              if (oldString.match(/[0-9] [AP]M/) && !oldString.match(/:[0-9]{2} [AP]M/)) {
                // get the index of "PM" or "AM"
                const periodIndex = oldString.includes('AM') ? oldString.indexOf('AM') : oldString.indexOf('PM');
                // insert a ":00" after the hour number
                const newString = oldString.slice(0, periodIndex-1) + ':00' + oldString.slice(periodIndex-1);
                dateStrSplit[i] = newString;
              }
            })
            // console.log('dateStrSplit', dateStrSplit)
            const startStr = dateStrSplit[0].substring(5);
            const endStr = dateStrSplit[1].substring(5);
            // console.log('startStr', startStr)
            // console.log('endStr', endStr)

            // add current year to date string so new Date will convert to a date this year
            startDate = new Date(year + startStr);
            endDate = new Date(year + endStr);
          }
        } else {
          // single day events
          const dateStrSplit = dateStr.split('– ');
          // console.log('dateStrSplit', dateStrSplit)
          if (!dateStrSplit[0].match(/[AP]M/)) {
            // if the event takes place in only the AM or PM
            const period = dateStrSplit[1].includes('AM') ? 'AM' : 'PM';
            let startStr = dateStrSplit[0];
            let endStr = dateStrSplit[1];
            startStr = startStr.includes(':') ?
                        startStr.slice(5) + period :
                        startStr.slice(5, startStr.length-1) + ':00 ' + period;
            const eventDate = startStr.slice(0, startStr.indexOf(','));
            endStr = endStr.includes(':') ?
                      eventDate + ', ' + endStr :
                      eventDate + ', ' + endStr.slice(0, endStr.length-3) + ':00 ' + period;
            startDate = new Date(year + startStr);
            endDate = new Date(year + endStr);
          } else {
            let startStr = dateStrSplit[0];
            let endStr = dateStrSplit[1];
            // take out the day of week
            startStr = startStr.slice(5);
            const startPeriod = startStr.includes('AM') ? 'AM' : 'PM';
            startStr = startStr.includes(':') ?
                        startStr :
                        startStr.slice(0, startStr.indexOf(startPeriod)-1) + ':00 ' + startPeriod;
            const eventDate = startStr.slice(0, startStr.indexOf(','));
            const endPeriod = endStr.includes('AM') ? 'AM' : 'PM';
            endStr = endStr.includes(':') ?
                      eventDate + ', ' + endStr :
                      eventDate + ', ' + endStr.slice(0, endStr.indexOf(endPeriod)-1) + ':00 ' + endPeriod;
            startDate = new Date(year + startStr);
            endDate = new Date(year + endStr);
          }
        }
      }

      // console.log('startDate', startDate)
      // console.log('endDate', endDate)

      // format the ticket info from the json result, which is an array of objects,
      // into an array of strings, which the database is expecting
      const ticketInfo = events[index].ticket_info.map(ticket => ticket.link);
      // console.log('ticket info', ticketInfo)

      // const dbEntry = {
      //   name: events[index].title,
      //   description: events[index].description,
      //   startDate,
      //   endDate,
      //   location: `${events[index].address[0] + events[index].address[1]}`,
      //   eventLink: events[index].link,
      //   tickets: ticketInfo,
      //   coverImageUrl: events[index].image,
      // };

      // console.log('dbEntry', dbEntry)

      // check if event is already in database
      const eventLink = events[index].link;
      const repeatEvent = await Event.findOne({ where: { eventLink }});

      if (repeatEvent) {
        resArray.push(repeatEvent);
        continue
      } else {
        const dbEvent = await Event.create({
          name: events[index].title,
          description: events[index].description,
          startDate,
          endDate,
          location: `${events[index].address[0] + ', ' + events[index].address[1]}`,
          eventLink: events[index].link,
          tickets: ticketInfo,
          coverImageUrl: events[index].image,
        });

        resArray.push(dbEvent);
      }
    }
    return res.json(resArray);
  });
}))

module.exports = router;
