import React, { Component } from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { IIngredient } from '../../components/Burger/BurgerIngredient/BurgerIngredient';

export interface ICheckoutProps extends RouteComponentProps {
  ingredients: IIngredient,
  totalPrice: number,
  purchased: boolean
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
    let summary = <Redirect to="/" />;
    if (this.props.ingredients) {
      const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ingredients}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinue={this.checkoutContinueHandler} />
          <Route
            path={`${this.props.match.path}/contact-data`}
            component={ContactData} />
        </div>
      );
    }
    return summary;
  };
}

const mapStateToProps = (state: any) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  } as ICheckoutProps;
};

export default connect(mapStateToProps)(Checkout);