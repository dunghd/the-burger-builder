import * as actionTypes from './actions';
import { IIngredient } from '../components/Burger/BurgerIngredient/BurgerIngredient';

type Action<TPayload> = {
  type: string;
  payload: TPayload;
}

interface IActionCreator<P> {
  type: string;
  (payload: P): Action<P>;
}

const actionCreator = <P,>(type: string): IActionCreator<P> => {
  return Object.assign(
    (payload: P) => ({ type, payload }),
    { type }
  );
};

const isType = <P,>(action: Action<any>, actionCreator: IActionCreator<P>): action is Action<P> => {
  return action.type === actionCreator.type;
};

export interface IBurgerReducerState {
  ingredients: IIngredient,
  totalPrice: number
};

export interface IBurgerReducerAction {
  ingredientName: string
};

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: 4
} as IBurgerReducerState;

export interface IIngredientPrice {
  [key: string]: number
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
} as IIngredientPrice;

export const addIngredientsAction =
  actionCreator<IBurgerReducerAction>(actionTypes.ADD_INGREDIENTS_ACTION_TYPE);
export const removeIngredientsAction =
  actionCreator<IBurgerReducerAction>(actionTypes.REMOVE_INGREDIENTS_ACTION_TYPE);

const reducer = (state: any = initialState, action: Action<IBurgerReducerState>): IBurgerReducerState => {
  if (isType(action, addIngredientsAction)) {
    return {
      ...state,
      ingredients: {
        ...state.ingredients,
        [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] + 1
      },
      totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload.ingredientName]
    } as IBurgerReducerState;
  }
  else if (isType(action, removeIngredientsAction)) {
    return {
      ...state,
      ingredients: {
        ...state.ingredients,
        [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] - 1
      },
      totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload.ingredientName]
    } as IBurgerReducerState;
  }
  else {
    return state;
  }
};

export default reducer;