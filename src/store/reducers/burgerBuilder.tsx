import { IIngredient } from '../../components/Burger/BurgerIngredient/BurgerIngredient';
import { Action, isType } from '../actions/actionTypes';
import { addIngredientsAction, fetchIngredientsFailedAction, removeIngredientsAction, setIngredientsAction } from '../actions/burgerBuilder';

export interface IBurgerReducerState {
  ingredients: IIngredient,
  totalPrice: number,
  error: boolean
};

export interface IBurgerReducerAction {
  ingredientName: string
};

const initialState = {
  ingredients: {} as IIngredient,
  totalPrice: 4,
  error: false
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
  else if (isType(action, setIngredientsAction)) {
    return {
      ...state,
      ingredients: action.payload,
      error: false
    } as IBurgerReducerState;
  }
  else if (isType(action, fetchIngredientsFailedAction)) {
    return {
      ...state,
      error: true
    } as IBurgerReducerState;
  }
  else {
    return state;
  }
};

export default reducer;