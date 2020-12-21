import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalState } from '../config/globalState';
import SignIn from './SignIn';


const Navbar = () => {
  const {state} = useGlobalState();
  const { isLoggedIn } = state;
  return (
    <div className="navbar">
        <div>
          <Link to={isLoggedIn ? "/sheds" : "/"}>Online Garden Shed</Link>
        </div>
        {/* <SignIn /> */}
    </div>
  );
}

export default Navbar;
