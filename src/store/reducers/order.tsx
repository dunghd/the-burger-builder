import { IOrder } from '../../containers/BurgerBuilder/BurgerBuilder';
import { Action, isType } from '../actions/actionTypes';
import * as actions from '../actions/order';
import { updateObject } from '../../shared/utility';

export interface IOrderReducerState {
  orders: IOrder[],
  loading: boolean,
  purchased: boolean,
  error: Error | null
};

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
  error: null
} as IOrderReducerState;

const purchaseInit = (state: any, action: Action<actions.IPurchaseInitAction>) => {
  return updateObject(state, {
    purchased: action.payload.purchased
  } as IOrderReducerState);
};

const purchaseBurgerStart = (state: any, action: Action<actions.IPurchaseBurgerStartAction>) => {
  return updateObject(state, {
    loading: action.payload.loading
  } as IOrderReducerState);
};

const purchaseBurgerSuccess = (state: any, action: Action<actions.IPurchaseBurgerSuccessAction>) => {
  const newOrder = updateObject(
    action.payload.orderData, { id: action.payload.id });
  return updateObject(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder)
  } as IOrderReducerState);
};

const fetchOrdersStart = (state: any, action: Action<actions.IFetchOrdersStartAction>) => {
  return updateObject(state, {
    loading: action.payload.loading
  } as IOrderReducerState);
};

const fetchOrdersSuccess = (state: any, action: Action<actions.IFetchOrdersSuccessAction>) => {
  return updateObject(state, {
    orders: action.payload.orders
  } as IOrderReducerState);
};

const fetchOrdersFail = (state: any, action: Action<actions.IFetchOrdersFailAction>) => {
  return updateObject(state, {
    loading: action.payload.loading,
    error: action.payload.error
  } as IOrderReducerState);
};

const purchaseBurgerFail = (state: any, action: Action<actions.IPurchaseBurgerFailAction>) => {
  return updateObject(state, {
    loading: action.payload.loading
  } as IOrderReducerState);
};

const reducer = (state: any = initialState, action: Action<any>): IOrderReducerState => {
  if (isType(action, actions.purchaseBurgerSuccessAction)) {
    return purchaseBurgerSuccess(state, action);
  }
  else if (isType(action, actions.purchaseInitAction)) {
    return purchaseInit(state, action);
  }
  else if (isType(action, actions.fetchOrdersStartAction)) {
    return fetchOrdersStart(state, action);
  }
  else if (isType(action, actions.fetchOrdersSuccessAction)) {
    return fetchOrdersSuccess(state, action);
  }
  else if (isType(action, actions.fetchOrdersFailAction)) {
    return fetchOrdersFail(state, action);
  }
  else if (isType(action, actions.purchaseBurgerStartAction)) {
    return purchaseBurgerStart(state, action);
  } else if (isType(action, actions.purchaseBurgerFailAction)) {
    return purchaseBurgerFail(state, action);
  }
  else {
    return state;
  }
};

export default reducer;