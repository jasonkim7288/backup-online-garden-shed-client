import { AUTH_SIGN_IN, AUTH_SIGN_OUT } from './types';

export const initialState = {
  isLoggedIn: false,
  errMsg: '',
  currentUser: null
};

export const stateReducer = (state, action) => {
  switch (action.type) {
    case AUTH_SIGN_IN:
      console.log('AUTH_SIGN_IN', action.payload);

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
    defualt:
      return state;
  }
};
