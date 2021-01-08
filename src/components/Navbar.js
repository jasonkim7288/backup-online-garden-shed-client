import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalState } from '../config/globalState';
import { SET_IS_MENU_ON } from '../config/types';
import SignIn from './SignIn';

const Navbar = () => {
  const { state, dispatch } = useGlobalState();
  const { isLoggedIn, isMenuOn, currentUser } = state;
  const [ isWindowSmall, setIsWindowSmall] = useState(null);

  const handleClickMenuIcon = () => {
    dispatch({
      type: SET_IS_MENU_ON,
      payload: !isMenuOn
    })
  }

  useEffect(() => {
    const handleResize = () => {
      // console.log('window.width:', window.innerWidth);
      if (window.innerWidth < 1200) {
        setIsWindowSmall(true);
      } else {
        setIsWindowSmall(false);
        dispatch({
          type: SET_IS_MENU_ON,
          payload: false
        })
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  return (
    <nav>
      <div className="navbar-wrapper">
        <div className="navbar container">
          <div>
            <Link to={isLoggedIn ? "/sheds" : "/"}>Online Garden Shed</Link>
          </div>
          {
            (isWindowSmall !== null) && (
              isWindowSmall ?
                <div className="mobile-menu-icon" onClick={handleClickMenuIcon}>
                  <i className="fa fa-bars"></i>
                </div>
              :
                <div>
                  <SignIn tagType="paragraphWithIcon"/>
                </div>
            )
          }
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
