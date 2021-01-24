import React, { Component, FormEvent } from 'react';
import { IIngredient } from '../../../components/Burger/BurgerIngredient/BurgerIngredient';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import { IOrder } from '../../BurgerBuilder/BurgerBuilder';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { RouteComponentProps } from 'react-router-dom';
import Input from '../../../components/UI/Input/Input';
import { IBurgerReducerState } from '../../../store/reducers/burgerBuilder';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions';

interface I_DOM_ElementInputConfig {
  type: string,
  placeHolder: string
};

interface I_DOM_ElementSelectOptionConfig {
  value: string,
  displayValue: string
};

interface I_DOM_ElementSelectConfig {
  options: I_DOM_ElementSelectOptionConfig[]
};

interface I_DOM_ElementInput {
  elementType: string,
  elementConfig: I_DOM_ElementInputConfig,
  value: string,
  validation: IOrderFormValidation,
  valid: boolean,
  touched: boolean
};

interface I_DOM_ElementOption {
  elementType: string,
  elementConfig: I_DOM_ElementSelectConfig,
  value: string,
  validation?: IOrderFormValidation,
  valid?: boolean,
  touched?: boolean
};

interface IOrderForm {
  [fieldName: string]: I_DOM_ElementInput | I_DOM_ElementOption
};

export interface IOrderFormData {
  [fieldName: string]: any
};

interface IOrderFormValidation {
  required?: boolean,
  minLength?: number,
  maxLength?: number
};

interface IContactDataState {
  orderForm: IOrderForm,
  formIsValid: boolean
};

export interface IContactDataProps extends RouteComponentProps {
  ingredients: IIngredient,
  totalPrice: number,
  onOrderBuilder: (orderData: IOrder) => any,
  loading: boolean
};

class ContactData extends Component<IContactDataProps, IContactDataState> {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeHolder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeHolder: 'Your E-Mail'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeHolder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeHolder: 'ZIP Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeHolder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        },
        value: 'fastest',
        validation: {},
        valid: true
      }
    },
    formIsValid: false
  } as IContactDataState;

  orderHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = {} as IOrderFormData;
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
    const orderData = {
      id: undefined,
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData
    } as IOrder;

    this.props.onOrderBuilder(orderData);
  };

  checkValidity = (value: string, rules?: IOrderFormValidation): boolean => {
    let isValid = true;

    if (rules?.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules?.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules?.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  };

  inputChangedHandler = (event: any, inputIdentifier: string) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid =
      this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifiers in updatedOrderForm) {
      formIsValid = Boolean(updatedOrderForm[inputIdentifiers].valid) && formIsValid;
    }
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    const formElementArray = [];
    for (const key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event: any,) => { this.inputChangedHandler(event, formElement.id) }} />
        ))}
        <Button
          btnType="Success"
          clicked={(event: FormEvent<HTMLFormElement>) => { this.orderHandler(event) }}
          disabled={!this.state.formIsValid}>
          ORDER
          </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  };
}

const mapStateToProps = (state: any) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading
  } as IBurgerReducerState;
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onOrderBuilder: (orderData: IOrder) => dispatch(actions.purchaseBurger(orderData))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));