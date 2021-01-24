import React from 'react';
import { IIngredient } from '../Burger/BurgerIngredient/BurgerIngredient';

import classes from './Order.module.css';

export interface IOrderProps {
  ingredients: IIngredient,
  price: number
};

type OrderPresentation = {
  name: string;
  amount: number;
};

const order = (props: React.PropsWithChildren<IOrderProps>) => {
  const ingredients = [] as OrderPresentation[];

  for (const ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: Number(props.ingredients[ingredientName])
    });
  }

  const ingredientOutput = ingredients.map(ig => {
    return <span
      style={{
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: '0 8px',
        border: '1px solid #ccc',
        padding: '5px'
      }}
      key={ig.name}>{ig.name} ({ig.amount})</span>;
  });

  return (
    <div className={classes.Order}>
      <p>{ingredientOutput}</p>
      <p>Price: <strong>USD {props.price?.toFixed(2)}</strong></p>
    </div>
  )
};

export default order;