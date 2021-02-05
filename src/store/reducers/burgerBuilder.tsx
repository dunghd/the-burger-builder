import { IIngredient } from '../../components/Burger/BurgerIngredient/BurgerIngredient';
import { Action, isType } from '../actions/actionTypes';
import * as actions from '../actions/burgerBuilder';
import { updateObject } from '../utility';

export interface IBurgerReducerState {
  ingredients: IIngredient,
  totalPrice: number,
  error: boolean,
  loading: boolean,
  token: string,
  isAuthenticated: boolean,
  building: boolean
};

export interface IBurgerReducerAction {
  ingredientName: string
};

const initialState = {
  ingredients: {} as IIngredient,
  totalPrice: 4,
  error: false,
  building: false
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

const addIngredient = (state: any, action: Action<IBurgerReducerAction>) => {
  const updatedIngredient = {
    [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] + 1
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updateState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload.ingredientName],
    building: true
  } as IBurgerReducerState;
  return updateObject(state, updateState);
};

const removeIngredient = (state: any, action: Action<IBurgerReducerAction>) => {
  const updatedIngredient = {
    [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] - 1
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updateState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload.ingredientName],
    building: true
  } as IBurgerReducerState;
  return updateObject(state, updateState);
};

const setIngredient = (state: any, action: Action<IBurgerReducerState> & Action<IIngredient>) => {
  return updateObject(state, {
    ingredients: {
      salad: action.payload.salad,
      bacon: action.payload.bacon,
      cheese: action.payload.cheese,
      meat: action.payload.meat,
    } as IIngredient,
    error: false,
    totalPrice: 4,
    building: false
  } as IBurgerReducerState);
};

const fetchIngredientsFailed = (state: any, action: Action<IBurgerReducerState>) => {
  return updateObject(state, {
    error: true
  }) as IBurgerReducerState;
};

const reducer = (state: any = initialState, action: Action<IBurgerReducerState>): IBurgerReducerState => {
  if (isType(action, actions.addIngredientsAction)) {
    return addIngredient(state, action);
  }
  else if (isType(action, actions.removeIngredientsAction)) {
    return removeIngredient(state, action);
  }
  else if (isType(action, actions.setIngredientsAction)) {
    return setIngredient(state, action);
  }
  else if (isType(action, actions.fetchIngredientsFailedAction)) {
    return fetchIngredientsFailed(state, action);
  }
  else {
    return state;
  }
};

export default reducer;