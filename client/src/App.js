import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import LoginForm from './components/Auth/LoginForm';
import { useDispatch } from 'react-redux';
import * as sessionActions from './store/session';
import SignupForm from './components/Auth/SignupForm';
import Navbar from './components/Navigation/Navbar';

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
      {isLoaded && (
        <Routes>
          <Route path='/login' element={<LoginForm />} />
          <Route path='/signup' element={<SignupForm />} />
        </Routes>
      )}
    </>
  );
}

export default App;
