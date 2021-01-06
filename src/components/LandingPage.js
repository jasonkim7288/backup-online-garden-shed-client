import React from 'react'
import { useHistory } from 'react-router-dom';
import SignIn from './SignIn';


const LandingPage = () => {
  let history = useHistory();

  const handleClickGuestLogin = () => {
    history.push('/sheds');
  };


  return (
    <div className="landing-page-container">
      <div className="guest-login-item" >
        <button type="button" onClick={handleClickGuestLogin} className="button guest">Guest</button>
      </div>
      <div className="google-login-item">
        <SignIn tagType="button"/>
      </div>
    </div>
  )
}

export default LandingPage
