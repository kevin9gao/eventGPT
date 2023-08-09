import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadEvents } from "../../store/events";
import './Event.css';

export default function Event() {
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const event = useSelector(state => state.events[eventId]);
  console.log('eventId', eventId)
  console.log('event', event)
  // console.log('date', event.startDate)
  // console.log('typeof date', typeof event.startDate)
  // console.log('date string', new Date(event.startDate).toString())

  useEffect(() => {
    dispatch(loadEvents());
  }, []);

  return (
    <div className="event-page-wrapper">
      <div className="event">
        <h1>{event?.name}</h1>
        <img
          className="event-image"
          src={event?.coverImageUrl}
        />
        <h3>{event?.description}</h3>
        <div className="startdate">
          <h4>{new Date(event?.startDate).toString()}</h4>
        </div>

        <h3>{event?.location}</h3>

        <div className="eventlink">
          <a href={event?.eventLink} 
          target="_blank">Eventbrite Link</a>
        </div>


      
      </div>
    </div>
  );
}
