import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

type OrdersState = {
  orders: any[],
  loading: boolean
};

export interface IOrdersProps { };

class Orders extends Component<IOrdersProps, OrdersState> {
  state = {
    orders: [],
    loading: true
  } as OrdersState;

  componentDidMount() {
    axios.get('/orders.json')
      .then(res => {
        const fetchedOrders = [];
        for (const key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });
        }
        this.setState({ loading: false, orders: fetchedOrders });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div>
        <Order />
        <Order />
      </div>
    );
  };
}

export default withErrorHandler(Orders, axios);