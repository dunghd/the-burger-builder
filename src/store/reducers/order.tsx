import { IOrder } from '../../containers/BurgerBuilder/BurgerBuilder';
import { Action, isType } from '../actions/actionTypes';
import {
  fetchOrdersFailAction
  , fetchOrdersStartAction
  , fetchOrdersSuccessAction
  , purchaseBurgerFailAction
  , purchaseBurgerStartAction
  , purchaseBurgerSuccessAction
  , purchaseInitAction
} from '../actions/order';
import { updateObject } from '../utility';

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

const reducer = (state: any = initialState, action: Action<any>): IOrderReducerState => {
  if (isType(action, purchaseBurgerSuccessAction)) {
    const newOrder = updateObject(action.payload.orderData, { id: action.payload.id });
    return updateObject(state, {
      loading: false,
      purchased: true,
      orders: state.orders.concat(newOrder)
    } as IOrderReducerState);
  }
  else if (isType(action, purchaseInitAction)) {
    return updateObject(state, {
      purchased: action.payload.purchased
    } as IOrderReducerState);
  }
  else if (isType(action, fetchOrdersStartAction)) {
    return updateObject(state, {
      loading: action.payload.loading
    } as IOrderReducerState);
  }
  else if (isType(action, fetchOrdersSuccessAction)) {
    return updateObject(state, {
      orders: action.payload.orders
    } as IOrderReducerState);
  }
  else if (isType(action, fetchOrdersFailAction)) {
    return updateObject(state, {
      loading: action.payload.loading,
      error: action.payload.error
    } as IOrderReducerState);
  }
  else if (isType(action, purchaseBurgerStartAction)) {
    return updateObject(state, {
      loading: action.payload.loading
    } as IOrderReducerState);
  } else if (isType(action, purchaseBurgerFailAction)) {
    return updateObject(state, {
      loading: action.payload.loading
    } as IOrderReducerState);
  }
  else {
    return state;
  }
};

export default reducer;