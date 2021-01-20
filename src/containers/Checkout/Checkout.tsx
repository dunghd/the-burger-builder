import React, { Component } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { IBurgerReducerState } from '../../store/reducers/burgerBuilder';
import { IIngredient } from '../../components/Burger/BurgerIngredient/BurgerIngredient';

export interface ICheckoutProps extends RouteComponentProps {
  ingredients: IIngredient,
  totalPrice: number
};

type CheckoutState = {};

class Checkout extends Component<ICheckoutProps, CheckoutState> {
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
          ingredients={this.props.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinue={this.checkoutContinueHandler} />
        <Route
          path={`${this.props.match.path}/contact-data`}
          component={ContactData} />
      </div>
    );
  };
}

const mapStateToProps = (state: any) => {
  return {
    ingredients: state.ingredients
  } as IBurgerReducerState;
};

export default connect(mapStateToProps)(Checkout);