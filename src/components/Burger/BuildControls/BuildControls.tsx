import React from 'react';
import { IIngredient } from '../BurgerIngredient/BurgerIngredient';
import BuildControl from './BuildControl/BuildControl';

import classes from './BuildControls.module.css';

export interface IBuildControl {
  label: string;
  type: string
};

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
] as IBuildControl[];

export interface IBuildControlProps {
  ingredientAdded: (type: string) => void,
  ingredientRemoved: (type: string) => void,
  disabled: IIngredient,
  price: number,
  purchasable: boolean,
  ordered: () => void,
  isAuth: boolean
};

const buildControls = (props: React.PropsWithChildren<IBuildControlProps>) => (
  <div className={classes.BuildControls}>
    <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
    {controls.map(ctrl =>
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)}
        disabled={props.disabled[ctrl.type] as boolean} />
    )}
    <button
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.ordered}>{props.isAuth ? `ORDER NOW` : `SIGN UP TO ORDER`}</button>
  </div>
);

export default buildControls;