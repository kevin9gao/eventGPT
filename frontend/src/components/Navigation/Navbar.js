import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navbar({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <li className='session-links m-2'>
        <NavLink
          to="/login"
          className='m-2'>Log In</NavLink>
        <NavLink
          to="/signup"
          className='m-2'>Sign Up</NavLink>
      </li>
    );
  }

  return (
    <ul className='navbar'>
      <li className='flex flex-row justify-between items-center'>
        <NavLink
          to="/home" className='m-4'>
            <h2>
              Home
            </h2>
        </NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navbar;
