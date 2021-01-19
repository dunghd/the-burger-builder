import * as actionTypes from './actions';
import { IIngredient } from '../components/Burger/BurgerIngredient/BurgerIngredient';

export interface IReducerState {
  ingredients: IIngredient,
  totalPrice: number
};

const initialState = {
  ingredients: null,
  totalPrice: 4
} as IReducerState;

const reducer = (state = initialState, action) => { };