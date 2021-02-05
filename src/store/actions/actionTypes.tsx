export const ADD_INGREDIENTS_ACTION_TYPE = 'ADD_INGREDIENTS_ACTION_TYPE';
export const REMOVE_INGREDIENTS_ACTION_TYPE = 'REMOVE_INGREDIENTS_ACTION_TYPE';
export const SET_INGREDIENTS_ACTION_TYPE = 'SET_INGREDIENTS_ACTION_TYPE';
export const FETCH_INGREDIENT_FAILED_ACTION_TYPE = 'FETCH_INGREDIENT_FAILED_ACTION_TYPE';

export const PURCHASE_BURGER_START_ACTION_TYPE = 'PURCHASE_BURGER_START_ACTION_TYPE';
export const PURCHASE_BURGER_SUCCESS_ACTION_TYPE = 'PURCHASE_BURGER_SUCCESS_ACTION_TYPE';
export const PURCHASE_BURGER_FAILED_ACTION_TYPE = 'PURCHASE_BURGER_FAILED_ACTION_TYPE';
export const PURCHASE_BURGER_INIT_ACTION_TYPE = 'PURCHASE_BURGER_INIT_ACTION_TYPE';

export const FETCH_ORDERS_START_ACTION_TYPE = 'FETCH_ORDERS_START_ACTION_TYPE';
export const FETCH_ORDERS_SUCCESS_ACTION_TYPE = 'FETCH_ORDERS_SUCCESS_ACTION_TYPE';
export const FETCH_ORDER_FAIL_ACTION_TYPE = 'FETCH_ORDER_FAIL_ACTION_TYPE';

export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const SET_AUTH_REDIRECT_PATH = 'SET_AUTH_REDIRECT_PATH';

export type Action<TPayload> = {
  type: string;
  payload: TPayload;
}

export interface IActionCreator<P> {
  type: string;
  (payload: P): Action<P>;
}

export const actionCreator = <P,>(type: string): IActionCreator<P> => {
  return Object.assign(
    (payload: P) => ({ type, payload }),
    { type }
  );
};

export const isType = <P,>(action: Action<any>, actionCreator: IActionCreator<P>): action is Action<P> => {
  return action.type === actionCreator.type;
};