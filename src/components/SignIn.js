import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import api from '../config/api';
import { useGlobalState } from '../config/globalState';
import { AUTH_SIGN_IN, AUTH_SIGN_OUT, SET_USER } from '../config/types';

const SignIn = () => {
  const { state, dispatch } = useGlobalState();
  const { isLoggedIn, currentUser } = state;
  let history = useHistory();
  let location = useLocation();

  const responseGoogle = async (data) => {
    try {
      const { accessToken } = data;

      if (accessToken) {
        const res = await api.post('/api/auth/signin', {
          access_token: accessToken
        });

        if (res.data) {
          const resAcquiredUser = await api.get('/api/auth/userinfo');
          const acquiredUser = resAcquiredUser.data;
          console.log('acquiredUser:', acquiredUser);
          dispatch({
            type: SET_USER,
            payload: acquiredUser
          })
          dispatch({ type: AUTH_SIGN_IN });
          if (location.pathname === '/') {
            history.push('/sheds');
          }
        }
      }
    } catch (err) {
      console.log('err: ', err.message);
    }
  };

  const handleClickLogout = async () => {
    console.log('clicked');
    try {
      await api.get('/api/auth/signout');
      dispatch({
        type: SET_USER,
        payload: null
      });
      dispatch({ type: AUTH_SIGN_OUT });
      history.push('/');
    } catch (err) {
      console.log('err: ', err.message);
    }
  };

  return (
    <>
      {
        (isLoggedIn && currentUser) ?
          <div className="navbar">
            <img src={currentUser.photo} alt="current user" className="profile-image"/>
            <button onClick={handleClickLogout} type="button" className="button">
              Sign out
            </button>
          </div>
        :
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            render={renderProps => (
              <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="button google">
                <i className="fab fa-google"></i>Sign in with Google
              </button>
            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
          />
      }
    </>
  );
}

export default SignIn;
