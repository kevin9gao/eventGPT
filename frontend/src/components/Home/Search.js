import React, { useState } from "react";
import './Home.css';
import { useNavigate } from "react-router-dom";

export default function Search() {
  const navigate = useNavigate();
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    navigate(`/search/${type}/${location}/${startDate}/${endDate}`);
  }

  return (
    <div className="search-wrapper">
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
    </div>
  );
}
