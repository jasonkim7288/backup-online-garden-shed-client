import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalState } from '../config/globalState';
import { SET_IS_MENU_ON } from '../config/types';
import HamburgerMenu from './HamburgerMenu';


const Navbar = () => {
  const { state, dispatch } = useGlobalState();
  const { isLoggedIn, isMenuOn } = state;

  const handleClickMenuIcon = () => {
    dispatch({
      type: SET_IS_MENU_ON,
      payload: !isMenuOn
    })
  }

  return (
    <>
      <div className="navbar-wrapper">
        <div className="navbar container">
          <div>
            <Link to={isLoggedIn ? "/sheds" : "/"}>Online Garden Shed</Link>
          </div>
          <div className="mobile-menu-icon" onClick={handleClickMenuIcon}>
            <i className="fa fa-bars"></i>
          </div>
          </div>
      </div>
      <HamburgerMenu/>
    </>
  );
}

export default Navbar;
