import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
import { IIngredient } from '../../components/Burger/BurgerIngredient/BurgerIngredient';
import { IOrderReducerState } from '../reducers/order';

export interface IOrderFormData {
  [fieldName: string]: any
};

export interface IOrder {
  id: string | undefined,
  ingredients: IIngredient,
  orderData: IOrderFormData
  price: number
};

export interface IPurchaseBurgerSuccessAction {
  id: string,
  orderData: any,
  loading: boolean,
  purchased: boolean
};

export interface IPurchaseBurgerFailAction {
  loading: boolean,
  error: any
};

export interface IPurchaseBurgerStartAction {
  loading: boolean
};

export interface IPurchaseInitAction extends IOrderReducerState {
  purchased: boolean
};

export interface IFetchOrdersSuccessAction {
  orders: IOrder[]
};

export interface IFetchOrdersFailAction {
  loading: boolean,
  error: Error
};

export interface IFetchOrdersStartAction extends IOrderReducerState {
  loading: boolean
};

export const purchaseBurgerSuccessAction =
  actionTypes.actionCreator<IPurchaseBurgerSuccessAction>(actionTypes.PURCHASE_BURGER_SUCCESS_ACTION_TYPE);

export const purchaseBurgerSuccess = (id: string, orderData: IOrder) => {
  return purchaseBurgerSuccessAction({ id: id, orderData: orderData } as IPurchaseBurgerSuccessAction);
};

export const purchaseBurgerFailAction =
  actionTypes.actionCreator<IPurchaseBurgerFailAction>(actionTypes.PURCHASE_BURGER_FAILED_ACTION_TYPE);

export const purchaseBurgerFail = (error: any) => {
  return purchaseBurgerFailAction({
    error: error,
    loading: false
  } as IPurchaseBurgerFailAction);
};

export const purchaseBurgerStartAction =
  actionTypes.actionCreator<IPurchaseBurgerStartAction>(actionTypes.PURCHASE_BURGER_START_ACTION_TYPE);

export const purchaseBurgerStart = () => {
  return purchaseBurgerStartAction({ loading: true } as IPurchaseBurgerStartAction);
};

export const purchaseBurger = (orderData: IOrder) => {
  return (dispatch: any) => {
    dispatch(purchaseBurgerStart());
    axios.post('/orders.json', orderData)
      .then(response => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch(error => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};

export const purchaseInitAction =
  actionTypes.actionCreator<IPurchaseInitAction>(actionTypes.PURCHASE_BURGER_INIT_ACTION_TYPE);

export const purchaseInit = () => {
  return purchaseInitAction({ purchased: false } as IPurchaseInitAction);
};

export const fetchOrdersSuccessAction =
  actionTypes.actionCreator<IFetchOrdersSuccessAction>(actionTypes.FETCH_ORDERS_SUCCESS_ACTION_TYPE)

export const fetchOrdersSuccess = (orders: IOrder[]) => {
  return fetchOrdersSuccessAction({ orders: orders } as IFetchOrdersSuccessAction);
};

export const fetchOrdersFailAction =
  actionTypes.actionCreator<IFetchOrdersFailAction>(actionTypes.FETCH_ORDER_FAIL_ACTION_TYPE);

export const fetchOrdersFail = (error: Error) => {
  return fetchOrdersFailAction({
    error: error,
    loading: false
  } as IFetchOrdersFailAction);
};

export const fetchOrdersStartAction =
  actionTypes.actionCreator<IFetchOrdersStartAction>(actionTypes.FETCH_ORDERS_START_ACTION_TYPE);

export const fetchOrdersStart = () => {
  return fetchOrdersStartAction({ loading: true } as IFetchOrdersStartAction);
};

export const fetchOrders = () => {
  return (dispatch: any) => {
    dispatch(fetchOrdersStart);
    axios.get('/orders.json')
      .then(res => {
        const fetchedOrders = [];
        for (const key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch(err => {
        dispatch(fetchOrdersFail(err));
      });
  };
};