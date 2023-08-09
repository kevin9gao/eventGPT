import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EventsList from "./EventsList";

export default function HomePage() {
  const navigate = useNavigate();
  const sessionUser = useSelector(state => state.session.user);

  if (!sessionUser) navigate('/');
  return (
    <>
      <div className="flex justify-center items-center">
        <h1>Home</h1>
      </div>
    </>
  )
}
