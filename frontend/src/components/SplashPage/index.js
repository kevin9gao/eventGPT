import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function SplashPage() {
  const navigate = useNavigate();
  const sessionUser = useSelector(state => state.session.user);

  if (sessionUser) navigate('/home');
  return (
    <>
      <div>
        <h1>Spin The Blok</h1>
      </div>
    </>
  )
}
