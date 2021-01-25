import axios from 'axios';

import * as actionTypes from './actionTypes';

export interface IAuthStartAction { };

export const purchaseBurgerStartAction =
  actionTypes.actionCreator<IAuthStartAction>(actionTypes.AUTH_START);

export const authStart = () => {
  return purchaseBurgerStartAction({} as IAuthStartAction);
};

export interface IAuthSuccessAction {
  authData: object
};

export const authSuccessAction =
  actionTypes.actionCreator<IAuthSuccessAction>(actionTypes.AUTH_SUCCESS);

export const authSuccess = (authData: object) => {
  return authSuccessAction({ authData: authData } as IAuthSuccessAction);
};

export interface IAuthFailAction {
  error: Error
};

export const authFailAction =
  actionTypes.actionCreator<IAuthFailAction>(actionTypes.AUTH_FAIL);

export const authFail = (error: Error) => {
  return authFailAction({ error: error } as IAuthFailAction);
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
        dispatch(authSuccess(res.data));        
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err));
      });
  };
};