import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { searchEvents } from "../../store/events";
import './Home.css';
import { NavLink, useParams } from "react-router-dom";

export default function EventsList() {
  const dispatch = useDispatch();
  const [events, setEvents] = useState([]);
  const { type, location, startDate, endDate } = useParams();

  useEffect(() => {
    (async function populateList() {
      const payload = {
        type,
        location,
        startDate,
        endDate,
      };

      const eventsQuery = await dispatch(searchEvents(payload));
      setEvents(eventsQuery);
    })();

    // console.log('EventsList events', events)
  }, []);

  return (
    <div className="events-list-wrapper">
      <div className="events-query-header">
        <h3>
          {`Showing ${type[0].toUpperCase() + type.slice(1)} events in
            ${location[0].toUpperCase() + location.slice(1)} from
            ${(new Date(startDate)).toDateString()} to
            ${(new Date(endDate)).toDateString()}`}
        </h3>
      </div>
      <div className="event-results">
        {!!events.length && events.map(event => (
          <NavLink
            className='card-navlinks'
            key={event.id}
            to={`/events/${event.id}`}
          >
            <article className="event-cards">
              <img src={event.coverImageUrl} alt={event.name} className="event-img" />
              <div className="card-content">
                <h4 className="event-name">{event.name}</h4>
                <p className="location">{event.location}</p>
                <p className="date">{new Date(event.startDate).toString()}</p>
              </div>
            </article>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
