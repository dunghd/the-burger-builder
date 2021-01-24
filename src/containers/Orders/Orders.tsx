import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { IOrder } from '../BurgerBuilder/BurgerBuilder';
import * as actions from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';

type OrdersState = {};

export interface IOrdersProps {
  onFetchOrders: () => IOrder[],
  orders: IOrder[],
  loading: boolean
};

class Orders extends Component<IOrdersProps, OrdersState> {
  componentDidMount() {
    this.props.onFetchOrders();
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = <>{
        this.props.orders.map((order: IOrder) => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price} />
        ))}
      </>
    }
    return (
      <div>
        {orders}
      </div>
    );
  };
}

const mapStateToProps = (state: any) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading
  } as IOrdersProps;
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));