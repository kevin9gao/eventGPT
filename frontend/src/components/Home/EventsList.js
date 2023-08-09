import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadEvents } from "../../store/events";
import './Home.css';
import { NavLink } from "react-router-dom";

export default function EventsList() {
  const dispatch = useDispatch();
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    console.log('EventsList events', events);
  }, [events]);

  const handleSubmit = async e => {
    e.preventDefault();

    const payload = {
      type,
      location,
      startDate,
      endDate,
    };

    const eventsQuery = await dispatch(loadEvents(payload));
    setEvents(eventsQuery);
  }

  return (
    <div className="events-list-wrapper">
      <div className="event-search">
        <h2 className="m-2">
          What type of events are you looking for and where?
        </h2>
        <form
          className="flex justify-center"
          onSubmit={handleSubmit}>
          <label>Show me</label>
          <input
            type="text"
            placeholder="(type of event)"
            value={type}
            onChange={e => setType(e.target.value)}
          />
          <label>events in</label>
          <input
            type="text"
            placeholder="(location)"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
          <label>during</label>
          <input
            type="text"
            placeholder="start date"
            onFocus={e => e.target.type = 'date'}
            onBlur={e => e.target.type = 'text'}
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
          />
          <label>to</label>
          <input
            type="text"
            placeholder="end date"
            onFocus={e => e.target.type = 'date'}
            onBlur={e => e.target.type = 'text'}
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
          />
          <button>Search</button>
        </form>
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
                <p className="date">{event.startDate}</p>
              </div>
            </article>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
