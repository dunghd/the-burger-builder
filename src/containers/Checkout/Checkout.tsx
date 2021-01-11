import React, { Component } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { IIngredient } from '../../components/Burger/BurgerIngredient/BurgerIngredient';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

export interface ICheckoutProps extends RouteComponentProps { };

type CheckoutState = {
  ingredients: IIngredient
};

class Checkout extends Component<ICheckoutProps, CheckoutState> {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1
    }
  } as CheckoutState;

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients: IIngredient = {};
    for (let param of query.entries()) {
      ingredients[param[0]] = +param[1]
    }
    this.setState({ ingredients: ingredients });
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
        <Route path={`${this.props.match.path}/contact-data`} component={ContactData} />
      </div>
    );
  };
}

export default Checkout;