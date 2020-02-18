import types from '../actions/types';
import { IAction } from '../actions/loginActions';

interface ILogin {
    isLoggingIn: boolean;
    loginError: boolean;
    isAuthenticated: boolean;
    isVerifying: boolean;
    isLoggingOut: boolean;
    logoutError: boolean;
}

export interface LoginState {
    login: ILogin;
}

const initialState = {};

export default (state = initialState, action: IAction) => {
  switch (action.type) {
  case types.LOGIN_REQUEST:
    return {
      ...state,
      isLoggingIn: true,
      loginError: false
    };

  case types.LOGIN_SUCCESS:
    return {
      ...state,
      isLoggingIn: false,
      isAuthenticated: true,
      user: action.user
    };

  case types.LOGIN_FAILURE:
    return {
      ...state,
      isLoggingIn: false,
      isAuthenticated: false,
      loginError: true
    };

  case types.LOGOUT_REQUEST:
    return {
      ...state,
      isLoggingOut: true,
      logoutError: false
    };

  case types.LOGOUT_SUCCESS:
    return {
      ...state,
      isLoggingOut: false,
      isAuthenticated: false,
      user: {}
    };

  case types.LOGOUT_FAILURE:
    return {
      ...state,
      isLoggingOut: false,
      logoutError: true
    };

  case types.VERIFY_REQUEST:
    return {
      ...state,
      isVerifying: true,
      verifyingError: false
    };

  case types.VERIFY_SUCCESS:
    return {
      ...state,
      isVerifying: false
    };

  default:
    return state;
  }
};
