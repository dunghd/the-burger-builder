import React from 'react';

import classes from './Order.module.css';

export interface IOrderProps { };

const order = (props: React.PropsWithChildren<IOrderProps>) => (
  <div className={classes.Order}>
    <p>Ingredients: Salad (1)</p>
    <p>Price: <strong>USD 5.45</strong></p>
  </div>
);

export default order;