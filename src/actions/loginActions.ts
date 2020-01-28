import * as types from "./types";
import { Dispatch } from "react";
import { firebaseService } from "../services/firebaseService";
import { Action } from "redux";

export interface IAction extends Action {
    type: string;
    user?: firebase.User;
}

const requestLogin = () => {
  return {
    type: types.LOGIN_REQUEST
  };
};

const receiveLogin = (user: firebase.User) => {
  return {
    type: types.LOGIN_SUCCESS,
    user
  };
};

const loginError = () => {
  return {
    type: types.LOGIN_FAILURE
  };
};

const requestLogout = () => {
  return {
    type: types.LOGOUT_REQUEST
  };
};

const receiveLogout = () => {
  return {
    type: types.LOGOUT_SUCCESS
  };
};

const logoutError = () => {
  return {
    type: types.LOGOUT_FAILURE
  };
};

const verifyRequest = () => {
  return {
    type: types.VERIFY_REQUEST
  };
};

const verifySuccess = () => {
  return {
    type: types.VERIFY_SUCCESS
  };
};

export const loginUser = (email: string, password: string) => (dispatch: Dispatch<IAction>) => {
    dispatch(requestLogin());
    firebaseService
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(credentials => {
          if(credentials.user !== null) { 
            dispatch(receiveLogin(credentials.user));
          }
        })
        .catch(error => {
            dispatch(loginError());
        });
}

export const logoutUser = () => (dispatch: Dispatch<IAction>) => {
    dispatch(requestLogout());
    firebaseService
        .auth()
        .signOut()
        .then(() => {
            dispatch(receiveLogout());
        })
        .catch(() => {
            dispatch(logoutError());
        });
}

export const verifyAuth = () => (dispatch: Dispatch<IAction>) => {
    dispatch(verifyRequest());
    firebaseService
        .auth()
        .onAuthStateChanged(user => {
            if (user !== null) {
                dispatch(receiveLogin(user));
            }
            dispatch(verifySuccess());
        });
}