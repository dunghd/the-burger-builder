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

export interface IOrderReducerState {
  orders: IOrder[],
  loading: boolean,
  purchased: boolean
};

const initialState = {
  orders: [],
  loading: false,
  purchased: false
} as IOrderReducerState;

const reducer = (state: any = initialState, action: Action<any>): IOrderReducerState => {
  if (isType(action, purchaseBurgerSuccessAction)) {
    const newOrder = {
      ...action.payload.orderData,
      id: action.payload.id
    };
    return {
      ...state,
      loading: false,
      purchased: true,
      orders: state.orders.concat(newOrder)
    } as IOrderReducerState;
  }
  else if (isType(action, purchaseInitAction)) {
    return {
      ...state,
      purchased: action.payload.purchased
    } as IOrderReducerState;
  }
  else if (isType(action, fetchOrdersStartAction)) {
    return {
      ...state,
      loading: action.payload.loading
    } as IOrderReducerState;
  }
  else if (isType(action, fetchOrdersSuccessAction)) {
    return {
      ...state,
      orders: action.payload.orders
    } as IOrderReducerState;
  }
  else if (isType(action, fetchOrdersFailAction)) {
    return {
      ...state,
      loading: false,
      error: action.payload.error
    } as IOrderReducerState;
  }
  else if (isType(action, purchaseBurgerStartAction)) {
    return {
      ...state,
      loading: true
    } as IOrderReducerState;
  } else if (isType(action, purchaseBurgerFailAction)) {
    return {
      ...state,
      loading: false
    } as IOrderReducerState;
  }
  else {
    return state;
  }
};

export default reducer;