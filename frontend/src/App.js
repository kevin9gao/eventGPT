import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import LoginForm from './components/Auth/LoginForm';
import { useDispatch } from 'react-redux';
import * as sessionActions from './store/session';
import SignupForm from './components/Auth/SignupForm';
import Navbar from './components/Navigation/Navbar';
import SplashPage from './components/SplashPage';
import HomePage from './components/Home/HomePage';
import Event from './components/Event/Event';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  // restore session user when react is refreshed
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navbar isLoaded={isLoaded} />
      <div id='navbar-offset'></div>
      {isLoaded && (
        <Routes>
          <Route path='/login' element={<LoginForm />} />
          <Route path='/signup' element={<SignupForm />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/events/:eventId' element={<Event />} />
          <Route path='/' element={<SplashPage />} />
        </Routes>
      )}
    </>
  );
}

export default App;
