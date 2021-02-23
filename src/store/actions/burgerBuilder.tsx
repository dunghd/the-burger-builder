import axios from '../../axios-orders';
import { IIngredient } from '../../components/Burger/BurgerIngredient/BurgerIngredient';
import { IBurgerReducerAction } from '../reducers/burgerBuilder';
import * as actionTypes from './actionTypes';


export const addIngredientsAction =
  actionTypes.actionCreator<IBurgerReducerAction>(actionTypes.ADD_INGREDIENTS_ACTION_TYPE);

export const addIngredient = (name: string) => {
  return addIngredientsAction({ ingredientName: name } as IBurgerReducerAction)
};

export const removeIngredientsAction =
  actionTypes.actionCreator<IBurgerReducerAction>(actionTypes.REMOVE_INGREDIENTS_ACTION_TYPE);

export const removeIngredient = (name: string) => {
  return removeIngredientsAction({ ingredientName: name } as IBurgerReducerAction)
};

export const setIngredientsAction =
  actionTypes.actionCreator<IIngredient>(actionTypes.SET_INGREDIENTS_ACTION_TYPE);

export const setIngredients = (ingredients: IIngredient) => {
  return setIngredientsAction(ingredients);
};

export const fetchIngredientsFailedAction =
  actionTypes.actionCreator(actionTypes.FETCH_INGREDIENT_FAILED_ACTION_TYPE);

export const fetchIngredientsFailed = () => {
  return fetchIngredientsFailedAction;
};

export const initIngredients = () => {
  return (dispatch: any) => {
    axios.get('https://react-my-burger-c95b7-default-rtdb.firebaseio.com/ingredients.json')
      .then(response => {
        dispatch(setIngredients(response.data));
      })
      .catch((error) => {
        dispatch(fetchIngredientsFailed);
      });
  };
};