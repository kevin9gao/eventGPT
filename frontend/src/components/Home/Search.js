import React, { useEffect, useState } from "react";
import './Home.css';
import { useNavigate } from "react-router-dom";

export default function Search() {
  const navigate = useNavigate();
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);
  const [hideErrors, setHideErrors] = useState(true);
  const [tooltip, setTooltip] = useState([]);
  const [hideTips, setHideTips] = useState(true);

  useEffect(() => {
    const errors = [];

    if (!type) {
      errors.push('Please specify what type of event you are looking for.');
    }

    if (!location) {
      errors.push('Please specify where you would like to search for events.');
    }

    if (!startDate) {
      errors.push('Please specify a starting date for your event search.');
    }

    if (!endDate) {
      errors.push('Please specify an ending date for your event search.');
    }

    setValidationErrors(errors);

    const tips = [];

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();

    if (new Date(startDate) < new Date(`${year}-${(month+1).toString().padStart(2, '0')}-${day}`)) {
      tips.push('*You have entered a starting date that is before today. Past events will not be shown in search results.')
    }

    setTooltip(tips);

    // console.log('tooltip', tooltip)
    // console.log('startDate', startDate)
    // console.log('new Date(startDate)', new Date(startDate))
    // console.log('`${year}-${month}-${day}`', `${year}-${(month+1).toString().padStart(2, '0')}-${day}`)
    // console.log('new Date()', new Date(`${year}-${(month+1).toString().padStart(2, '0')}-${day}`))

    if (tooltip.length) {
      setHideTips(false);
    }
  }, [type, location, startDate, endDate]);

  const handleSubmit = e => {
    e.preventDefault();

    if (validationErrors.length) {
      setHideErrors(false);
      return;
    }

    navigate(`/search/${type}/${location}/${startDate}/${endDate}`);
  }

  return (
    <div className="search-wrapper">
      <div className="event-search">
        <h2 className="m-2">
          What type of events are you looking for and where?
        </h2>
        <div className="errors" hidden={hideErrors}>
          <ul>
            {validationErrors?.map((error, idx) => (
              <li key={idx}>
                {error}
              </li>
            ))}
          </ul>
        </div>
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
        <div className="tooltip" hidden={hideTips}>
          <ul>
            {tooltip?.map((tip, idx) => (
              <li key={idx}>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
