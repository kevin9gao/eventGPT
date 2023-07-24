import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loadEvents } from "../../store/events";

export default function EventsList() {
  const dispatch = useDispatch();
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    const payload = {
      location,
      date,
    };

    dispatch(loadEvents(payload));
  }

  return (
    <div className="events-list-wrapper">
      <h1>Events</h1>
      <form onSubmit={handleSubmit}>
        <label>Location</label>
        <input
          type="text"
          value={location}
          onChange={e => setLocation(e.target.value)}
        />
        <label>Date</label>
        <input
          type="text"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <button>Search</button>
      </form>
    </div>
  );
}
