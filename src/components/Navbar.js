import React from 'react';
import GoogleLogin from 'react-google-login';
import api from '../config/api';
import { useGlobalState } from '../config/globalState';
import { AUTH_SIGN_IN } from '../config/types';



const Navbar = () => {
  const { state, dispatch } = useGlobalState();
  const { isLoggedIn } = state;

  const responseGoogle = async (data) => {
    const { accessToken } = data;

    const res = await api.post('/api/auth/signin', {
      access_token: accessToken
    });

    const { token } = res.data;
    dispatch({
      type: AUTH_SIGN_IN,
      payload: token
    });

    localStorage.setItem('JWT_TOKEN', token);
  };

  return (
    <div>
      Online Garden Shed
      {
        isLoggedIn &&
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
      }
    </div>
  )
}

export default Navbar
