import { AUTH_SIGN_IN, AUTH_SIGN_OUT, SET_TOKEN, SET_USER, SET_IS_MENU_ON } from './types';

export const initialState = {
  isSignedIn: false,
  errMsg: '',
  currentUser: null,
  token: '',
  sheds: [],
  isMenuOn: false
};

export const stateReducer = (state, action) => {
  switch (action.type) {
    case AUTH_SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
        errMsg: ''
      };
    case AUTH_SIGN_OUT:
      return {
        ...state,
        isSignedIn: false,
        errMsg: ''
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload
      };
    case SET_USER:
      return  {
        ...state,
        currentUser: action.payload
      };
    case SET_IS_MENU_ON:
      return {
        ...state,
        isMenuOn: action.payload
      };
    default:
      return state;
  }
};
