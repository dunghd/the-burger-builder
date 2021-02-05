import axios from 'axios';

import * as actionTypes from './actionTypes';

export interface IAuthStartAction {
  error: Error | null,
  loading: boolean
};

export const authStartAction =
  actionTypes.actionCreator<IAuthStartAction>(actionTypes.AUTH_START);

export const authStart = () => {
  return authStartAction({
    error: null,
    loading: true
  } as IAuthStartAction);
};

export interface IAuthSuccessAction {
  idToken: any,
  userId: string,
  error: Error | null,
  loading: boolean
};

export const authSuccessAction =
  actionTypes.actionCreator<IAuthSuccessAction>(actionTypes.AUTH_SUCCESS);

export const authSuccess = (token: any, userId: any) => {
  return authSuccessAction({
    idToken: token,
    userId: userId,
    error: null,
    loading: false
  } as IAuthSuccessAction);
};

export interface IAuthFailAction {
  error: Error,
  loading: boolean
};

export const authFailAction =
  actionTypes.actionCreator<IAuthFailAction>(actionTypes.AUTH_FAIL);

export const authFail = (error: Error) => {
  return authFailAction({ error: error, loading: false } as IAuthFailAction);
};

export interface ILogoutAction { };

export const logoutAction =
  actionTypes.actionCreator<ILogoutAction>(actionTypes.AUTH_LOGOUT);

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return logoutAction({} as ILogoutAction);
};

export const checkAuthTimeout = (expirationTime: number) => {
  return (dispatch: any) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email: string, password: string, isSignUp: boolean) => {
  return (dispatch: any) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url = isSignUp ?
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAhzOep93XwplAWPfIzQBrXt0ehDC5RcCw' :
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAhzOep93XwplAWPfIzQBrXt0ehDC5RcCw';
    axios.post(
      url,
      authData)
      .then(res => {
        console.log(res);
        const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('expirationDate', expirationDate.toString());
        localStorage.setItem('userId', res.data.localId);
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch(err => {
        console.dir(err);
        dispatch(authFail(err.response.data.error));
      });
  };
};

export interface ISetAuthRedirectPathAction {
  path: string
};

export const setAuthRedirectPathAction =
  actionTypes.actionCreator<ISetAuthRedirectPathAction>(actionTypes.SET_AUTH_REDIRECT_PATH);

export const setAuthRedirectPath = (path: string) => {
  return setAuthRedirectPathAction({ path: path } as ISetAuthRedirectPathAction);
};

export const authCheckState = () => {
  return (dispatch: any) => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    }
    else {
      if (!localStorage.getItem('expirationDate')) {
        return;
      }

      const expirationDate = new Date(localStorage.getItem('expirationDate') as string);
      if (expirationDate <= new Date()) {
        dispatch(logout());
      }
      else {
        const userId = localStorage.getItem('userId')
        dispatch(authSuccess(token, userId));
        const expirationDate = new Date(localStorage.getItem('expirationDate') as string);
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
    }
  };
};