import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import * as sessionActions from '../../store/session';
import './Navigation.css';

export default function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const profMenu = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  const [profPic, setProfPic] = useState(user?.profilePicUrl);

  useEffect(() => {
    if (!profPic) {
      setProfPic(''); // todo
    }

    if (user?.profilePicUrl) setProfPic(user.profilePicUrl);
  }, [user?.profilePicUrl, profPic]);

  const toggleMenu = e => {
    e.preventDefault();

    setShowMenu(!showMenu);
  }

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = e => {
      if (profMenu.current && showMenu && !profMenu.current.contains(e.target)) {
        setShowMenu(false);
      }
    }

    document.addEventListener('mousedown', closeMenu);

    return () => document.removeEventListener('mousedown', closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <div className="dropdown-wrapper">
        <button onClick={toggleMenu} className="profile-btn">
          <img
            src={profPic}
            className='avatar'
            alt="avatar"
          />
        </button>
        {showMenu && (
          <div
            className="profile-dropdown border-slate-800 border-2 rounded shadow-md bg-gradient-to-br from-blue-600 from-30% to-red-600 to-70% hover:from-blue-500 hover:from-30% hover:to-red-500 hover:to-70%"
            ref={profMenu}>
            <p>
              <NavLink
                to={`/users/${user?.id}`}
                className='navbar-links'
                onClick={() => setShowMenu(false)}>
                {user?.username}
              </NavLink>
            </p>
            <p>
              <button onClick={logout}>Log Out</button>
            </p>
          </div>
        )}
      </div>
    </>
  );
}
