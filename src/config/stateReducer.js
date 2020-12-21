import { AUTH_SIGN_IN, AUTH_SIGN_OUT, SET_TOKEN, SET_USER, SET_SHEDS } from './types';

export const initialState = {
  isLoggedIn: false,
  errMsg: '',
  currentUser: null,
  token: '',
  sheds: []
};

export const stateReducer = (state, action) => {
  switch (action.type) {
    case AUTH_SIGN_IN:
      return {
        ...state,
        isLoggedIn: true,
        errMsg: ''
      };
    case AUTH_SIGN_OUT:
      console.log('AUTH_SIGN_OUT');
      return {
        ...state,
        isLoggedIn: false,
        errMsg: ''
      };
    case SET_TOKEN:
      console.log('SET_TOKEN');
      return {
        ...state,
        token: action.payload
      };
    case SET_USER:
      console.log('SET_USER');
      return  {
        ...state,
        currentUser: action.payload
      };
    case SET_SHEDS:
      console.log('SET_SHEDS');
      return {
        ...state,
        sheds: action.payload
      }
    default:
      return state;
  }
};
