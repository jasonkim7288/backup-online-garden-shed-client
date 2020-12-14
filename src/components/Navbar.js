import React from 'react';
import GoogleLogin from 'react-google-login';
import api from '../config/api';
import { useGlobalState } from '../config/globalState';
import { AUTH_SIGN_IN, SET_USER } from '../config/types';


const Navbar = () => {
  const { state, dispatch } = useGlobalState();
  const { isLoggedIn } = state;

  const responseGoogle = async (data) => {
    try {
      const { accessToken } = data;

      const res = await api.post('/api/auth/signin', {
        access_token: accessToken
      });
      console.log('res.data:', res.data);

      const acquiredUser = await api.get('/api/auth/userinfo', {
        headers: { access_token: accessToken }
      });
      console.log('acquiredUser:', acquiredUser);

      dispatch({
        type: SET_USER,
        payload: res.data.user
      })
      dispatch({ type: AUTH_SIGN_IN });
      localStorage.setItem('already_logged_in', true);
    } catch (err) {
      console.log('err: ', err.message);
    }

  };

  return (
    <div>
      Online Garden Shed
      {
        !isLoggedIn &&
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
