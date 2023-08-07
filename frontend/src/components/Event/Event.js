import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function Event() {
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const event = useSelector(state => state.events.eventId);

  return (
    <div>
      EVENT
    </div>
  );
}
