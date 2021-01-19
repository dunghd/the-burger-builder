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
import { addIngredientsAction, IBurgerReducerAction, IBurgerReducerState, removeIngredientsAction } from '../../store/reducer';

export interface IBurgerBuilderProps extends RouteComponentProps {
  ingredients: IIngredient,
  totalPrice: number,
  onIngredientAdded: (ingName: string) => void,
  onIngredientRemoved: (ingName: string) => void,
};

export interface IBurgerBuilderState {
  ingredients: IIngredient,
  totalPrice: number,
  purchasable: boolean,
  purchasing: boolean,
  loading: boolean,
  isError: boolean
};

export interface IOrder {
  id: string | undefined,
  ingredients: IIngredient,
  orderData: IOrderFormData
  price: number
};

class BurgerBuilder extends Component<IBurgerBuilderProps, IBurgerBuilderState> {
  state = {
    purchasing: false,
    loading: false,
    isError: false
  } as IBurgerBuilderState;

  componentDidMount() {
    // axios.get('https://react-my-burger-c95b7-default-rtdb.firebaseio.com/ingredients.json')
    //   .then(response => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch((error) => {
    //     this.setState({ isError: true })
    //   });
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
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
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
    let burger = this.state.isError ? <p>Ingredients can't be loaded!</p> : <Spinner />;

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
            ordered={this.purchaseHandler} />
        </Auxiliary>
      );

      orderSummary = <OrderSummary
        ingredients={this.props.ingredients}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.props.totalPrice} />;
    }

    if (this.state.loading) {
      orderSummary = <Spinner />
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
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  } as IBurgerReducerState;
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onIngredientAdded: (ingName: string) => dispatch(
      addIngredientsAction({ ingredientName: ingName } as IBurgerReducerAction)
    ),
    onIngredientRemoved: (ingName: string) => dispatch(
      removeIngredientsAction({ ingredientName: ingName } as IBurgerReducerAction)
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));