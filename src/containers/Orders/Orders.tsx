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
  onFetchOrders: (token: string) => IOrder[],
  orders: IOrder[],
  loading: boolean,
  token: string
};

class Orders extends Component<IOrdersProps, OrdersState> {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token);
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
    loading: state.order.loading,
    token: state.auth.idToken
  } as IOrdersProps;
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onFetchOrders: (token: any) => dispatch(actions.fetchOrders(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));