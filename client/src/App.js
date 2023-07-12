import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import LoginForm from './components/Auth/LoginForm';
import { useDispatch } from 'react-redux';
import * as sessionActions from './store/session';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  // restore session user when react is refreshed
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <Routes>
      <Route path='/login' element={<LoginForm />} />
    </Routes>
  );
}

export default App;
