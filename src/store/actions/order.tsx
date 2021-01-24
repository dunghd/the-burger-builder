import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
import { IIngredient } from '../../components/Burger/BurgerIngredient/BurgerIngredient';

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
  error: any
};

export interface IPurchaseBurgerStartAction {
  loading: boolean
};

export interface IPurchaseInitAction {
  purchased: boolean
};

export const purchaseBurgerSuccessAction =
  actionTypes.actionCreator<IPurchaseBurgerSuccessAction>(actionTypes.PURCHASE_BURGER_SUCCESS_ACTION_TYPE);

export const purchaseBurgerSuccess = (id: string, orderData: IOrder) => {
  return purchaseBurgerSuccessAction({ id: id, orderData: orderData } as IPurchaseBurgerSuccessAction);
};

export const purchaseBurgerFailAction =
  actionTypes.actionCreator<IPurchaseBurgerFailAction>(actionTypes.PURCHASE_BURGER_FAILED_ACTION_TYPE);

export const purchaseBurgerFail = (error: any) => {
  return purchaseBurgerFailAction({ error: error } as IPurchaseBurgerFailAction);
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