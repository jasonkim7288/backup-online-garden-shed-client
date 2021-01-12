import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useGlobalState } from '../config/globalState';
import SignIn from './SignIn';


const LandingPage = () => {
  const { state } = useGlobalState();
  const { isSignedIn } = state;
  let history = useHistory();

  const handleClickGuestLogin = () => {
    history.push('/sheds');
  };

  useEffect(() => {
    console.log("Hi");
    if (isSignedIn) {
      history.push('/sheds');
    }
  }, [isSignedIn, history]);

  return (
    <div className="landing-page-container">
      <div className="guest-login-item" >
        <button type="button" onClick={handleClickGuestLogin} className="guest-button">Guest</button>
      </div>
      <div className="google-login-item">
        <SignIn tagType="button"/>
      </div>
    </div>
  )
}

export default LandingPage
