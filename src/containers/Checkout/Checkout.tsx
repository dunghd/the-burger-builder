import React, { Component } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { IIngredient } from '../../components/Burger/BurgerIngredient/BurgerIngredient';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

export interface ICheckoutProps extends RouteComponentProps { };

type CheckoutState = {
  ingredients: IIngredient,
  totalPrice: number
};

class Checkout extends Component<ICheckoutProps, CheckoutState> {
  state = {
    ingredients: {} as IIngredient,
    totalPrice: 0
  } as CheckoutState;

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients: IIngredient = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === 'price') {
        price = +param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }

    }
    this.setState({ ingredients: ingredients, totalPrice: price });
  };

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinue={this.checkoutContinueHandler} />
        <Route
          path={`${this.props.match.path}/contact-data`}
          render={(props: RouteComponentProps) => (<ContactData
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            {...props} />)} />
      </div>
    );
  };
}

export default Checkout;