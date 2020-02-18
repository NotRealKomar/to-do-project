import types from './types';
import { Dispatch } from 'react';
import { firebaseService } from '../services/firebaseService';
import { Action } from 'redux';

export interface IAction extends Action {
    type: string;
    user?: firebase.User;
}

const requestLogin: () => IAction = () => {
  return {
    type: types.LOGIN_REQUEST
  };
};

const receiveLogin: (user: firebase.User) => IAction = (user) => {
  return {
    type: types.LOGIN_SUCCESS,
    user
  };
};

const loginError: () => IAction  = () => {
  return {
    type: types.LOGIN_FAILURE
  };
};

const requestLogout: () => IAction  = () => {
  return {
    type: types.LOGOUT_REQUEST
  };
};

const receiveLogout: () => IAction  = () => {
  return {
    type: types.LOGOUT_SUCCESS
  };
};

const logoutError: () => IAction  = () => {
  return {
    type: types.LOGOUT_FAILURE
  };
};

const verifyRequest: () => IAction  = () => {
  return {
    type: types.VERIFY_REQUEST
  };
};

const verifySuccess: () => IAction  = () => {
  return {
    type: types.VERIFY_SUCCESS
  };
};

export const loginUser = (email: string, password: string) => async (dispatch: Dispatch<IAction>) => {
  dispatch(requestLogin());
  try {
    const credentials = await firebaseService.auth().signInWithEmailAndPassword(email, password);
    const { user } = credentials;
    user && dispatch(receiveLogin(user));
  } catch (error) {
    dispatch(loginError());
  }
};

export const logoutUser = () => async (dispatch: Dispatch<IAction>) => {
  dispatch(requestLogout());
  try {
    await firebaseService.auth().signOut();
    dispatch(receiveLogout());
  } catch (error) {
    dispatch(logoutError());
  }
};

export const verifyAuth = () => async (dispatch: Dispatch<IAction>) => {
  dispatch(verifyRequest());
  firebaseService
    .auth()
    .onAuthStateChanged(user => {
      user && dispatch(receiveLogin(user));
      dispatch(verifySuccess());
    });
};
