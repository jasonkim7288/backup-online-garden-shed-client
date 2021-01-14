import React from 'react';
import { useHistory } from 'react-router-dom';
import api from '../config/api';
import { useGlobalState } from '../config/globalState';
import { AUTH_SIGN_OUT, SET_IS_MENU_ON, SET_USER } from '../config/types';
import SignIn from './SignIn';

const HamburgerMenu = () => {
  const { state, dispatch } = useGlobalState();
  const { currentUser, isMenuOn } = state;
  let history = useHistory();

  const handleClickRedirect = (event) => {
    console.log('event.target.dataset:', event.target.dataset.path);
    console.log('currentUser:', currentUser);
    const { path } = event.target.dataset;
    if (path) {
      dispatch({
        type: SET_IS_MENU_ON,
        payload: false
      });
      history.push(path);
    }
  };

  const handleClickSignOut = async () => {
    try {
      dispatch({
        type: SET_IS_MENU_ON,
        payload: false
      });
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
  }

  return (
    <>
      {
        isMenuOn &&
        <div id="mobile-menu-list">
          {
            currentUser ?
              <>
                <div className="mobile-menu-profile">
                  <img src={currentUser.photo} alt="current user" className="profile-image"/>
                  <h4>{currentUser.displayName}</h4>
                </div>

                <p onClick={handleClickRedirect} data-path={`/user/my-shed`}>My Garden Shed</p>
                <p onClick={handleClickRedirect} data-path={`/sheds/${currentUser.shed}/records/new`}>Create a new record</p>
                <hr />
                <p onClick={handleClickRedirect} data-path={`/user/following-sheds`}>Following - Garden Sheds</p>
                <p onClick={handleClickRedirect} data-path={`/user/following-plants`}>Following - Plants</p>
                <hr />
                <p onClick={handleClickRedirect} data-path={`/mission-statement`}>Mission Statement</p>
                <hr />
                <p onClick={handleClickSignOut}>Sign out</p>
              </>
              :
              <>
                <SignIn tagType="paragraphWithIcon"/>
                <hr />
                <p>Mission Statement</p>
              </>
          }
        </div>
      }
    </>
  );
};

export default HamburgerMenu;
