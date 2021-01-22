import { IOrder } from '../../containers/BurgerBuilder/BurgerBuilder';
import { Action, isType } from '../actions/actionTypes';
import { purchaseBurgerFailAction, purchaseBurgerStartAction, purchaseBurgerSuccessAction, purchaseInitAction } from '../actions/order';

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

const reducer = (state: any = initialState, action: Action<IOrderReducerState>): IOrderReducerState => {
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
      purchased: false
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