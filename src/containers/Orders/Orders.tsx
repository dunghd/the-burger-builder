import React, { Component } from 'react';
import Order from '../../components/Order/Order';

type OrdersState = {};

export interface IOrdersProps { };

class Orders extends Component<IOrdersProps, OrdersState> {
  render() {
    return (
      <div>
        <Order />
        <Order />
      </div>
    );
  };
}

export default Orders;