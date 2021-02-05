import React, { Component } from 'react';
import { connect } from 'react-redux';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import { IIngredient } from '../../components/Burger/BurgerIngredient/BurgerIngredient';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { RouteComponentProps } from 'react-router-dom';
import { IOrderFormData } from '../Checkout/ContactData/ContactData';
import { IBurgerReducerState } from '../../store/reducers/burgerBuilder';
import * as actions from '../../store/actions';

export interface IBurgerBuilderProps extends RouteComponentProps {
  ingredients: IIngredient,
  totalPrice: number,
  isError: boolean,
  onIngredientAdded: (ingName: string) => void,
  onIngredientRemoved: (ingName: string) => void,
  onInitIngredients: () => IIngredient,
  onInitPurchase: () => void,
  isAuthenticated: boolean,
  onSetAuthRedirectPath: (path: string) => void
};

export interface IBurgerBuilderState {
  purchasing: boolean
};

export interface IOrder {
  id: string | undefined,
  ingredients: IIngredient,
  orderData: IOrderFormData
  price: number
};

class BurgerBuilder extends Component<IBurgerBuilderProps, IBurgerBuilderState> {
  state = {
    purchasing: false
  } as IBurgerBuilderState;

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchaseState(ingredients: IIngredient): boolean {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return +sum + +el;
      }, 0);

    return sum > 0;
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  };

  render() {
    const disabledInfo = {
      ...this.props.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.isError ? <p>Ingredients can't be loaded!</p> : <Spinner />;

    if (Object.keys(this.props.ingredients).length > 0) {
      burger = (
        <Auxiliary>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ingredients)}
            price={this.props.totalPrice}
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuthenticated} />
        </Auxiliary>
      );

      orderSummary = <OrderSummary
        ingredients={this.props.ingredients}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.props.totalPrice} />;
    }

    return (
      <Auxiliary>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Auxiliary>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.idToken !== null && state.auth.idToken !== undefined
  } as IBurgerReducerState;
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onIngredientAdded: (ingName: string) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName: string) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path: string) => dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));