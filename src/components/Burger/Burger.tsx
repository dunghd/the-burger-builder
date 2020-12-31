import * as React from 'react';

import classes from './Burger.module.css'
import BurgerIngredient, { IIngredient } from './BurgerIngredient/BurgerIngredient';

export interface IBurgerProps {
  ingredients: IIngredient;
};

const burger = (props: React.PropsWithChildren<IBurgerProps>) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = new Array(<p>Please start adding ingredients!</p>);
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;