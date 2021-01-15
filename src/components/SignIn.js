import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import api from '../config/api';
import { useGlobalState } from '../config/globalState';
import { AUTH_SIGN_IN, AUTH_SIGN_OUT, SET_IS_MENU_ON, SET_USER } from '../config/types';
import ProgressFullScreen from './ProgressFullScreen';

const SignIn = ({ tagType }) => {
  const { state, dispatch } = useGlobalState();
  const { isSignedIn, currentUser } = state;
  const [isInProgress, setIsInProgress] = useState(false);
  let history = useHistory();
  let location = useLocation();

  const responseGoogle = async (data) => {
    try {
      const { accessToken } = data;
      console.log('data:', data);

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
      console.log('err: ', err.response);
    } finally {
      setIsInProgress(false);
      dispatch({
        type: SET_IS_MENU_ON,
        payload: false
      });
    }
  };

  const handleClickLogout = async () => {
    // close the menu first
    dispatch({
      type: SET_IS_MENU_ON,
      payload: false
    });

    try {
      await api.get('/api/auth/signout');
      dispatch({
        type: SET_USER,
        payload: null
      });
      dispatch({ type: AUTH_SIGN_OUT });
      history.push('/');
    } catch (err) {
      console.log('err: ', err.response);
    }
  };

  return (
    <>
      { isInProgress && <ProgressFullScreen />}
      {
        (isSignedIn && currentUser) ?
          <div className="profile-wrapper">
            <img src={currentUser.photo} alt="current user" className="profile-image"/>
            {

              (tagType === 'button') ?
                  <button onClick={handleClickLogout} type="button" className="add-hover">
                    Sign out
                  </button>
                :
                  <p onClick={handleClickLogout} className="add-hover">
                    Sign out
                  </p>
            }
          </div>
        :
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            render={renderProps => (
              (tagType === 'button') ? (
                <button disabled={renderProps.disabled}
                    className="button google guest-button"
                    onClick={event => {
                      setIsInProgress(true);
                      renderProps.onClick(event);
                    }}
                >
                  <i className="fab fa-google"></i>Sign in with Google
                </button>
              )
              : (
                <p onClick={(event) => {
                      setIsInProgress(true);
                      renderProps.onClick(event);
                    }}
                    disabled={renderProps.disabled}
                    className="add-hover"
                >
                  <i className="fab fa-google"></i>Sign in with Google
                </p>
              )
            )}
            // uxMode="redirect"
            // responseType='code'
            // redirectUri={`${window.location.href}auth/google/callback`}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            />
      }
    </>
  );
}

export default SignIn;

