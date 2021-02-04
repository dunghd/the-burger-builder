import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import * as actions from '../actions/auth';

type authReducerState = {
  token: string | null,
  userId: string | null,
  error: Error | null,
  loading: boolean
};

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false
} as authReducerState;

const authStart = (state: any, action: actionTypes.Action<actions.IAuthStartAction>) => {
  return updateObject(state, {
    error: action.payload.error,
    loading: action.payload.loading
  } as actions.IAuthStartAction);
};

const authSuccess = (state: any, action: actionTypes.Action<actions.IAuthSuccessAction>) => {
  return updateObject(state, {
    idToken: action.payload.idToken,
    userId: action.payload.userId,
    error: action.payload.error,
    loading: action.payload.loading
  } as actions.IAuthSuccessAction);
};

const authFail = (state: any, action: actionTypes.Action<actions.IAuthFailAction>) => {
  return updateObject(state, {
    error: action.payload.error,
    loading: action.payload.loading
  } as actions.IAuthFailAction);
};

const authLogout = (state: any, action: actionTypes.Action<actions.ILogoutAction>) => {
  return updateObject(state, { idToken: null, userId: null });
};

const reducer = (state: any = initialState, action: actionTypes.Action<any>) => {
  if (actionTypes.isType(action, actions.authStartAction)) {
    return authStart(state, action);
  }
  else if (actionTypes.isType(action, actions.authSuccessAction)) {
    return authSuccess(state, action);
  }
  else if (actionTypes.isType(action, actions.authFailAction)) {
    return authFail(state, action);
  }
  else if (actionTypes.isType(action, actions.logoutAction)) {
    return authLogout(state, action);
  }
  else {
    return state;
  }
};

export default reducer;