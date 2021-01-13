import React, { Component, FormEvent } from 'react';
import { IIngredient } from '../../../components/Burger/BurgerIngredient/BurgerIngredient';

import Button from '../../../components/UI/Button/Button';
import { IOrder } from '../../BurgerBuilder/BurgerBuilder';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { RouteComponentProps } from 'react-router-dom';
import Input from '../../../components/UI/Input/Input';

interface DOM_ElementInputConfig {
  type: string,
  placeHolder: string
};

interface DOM_ElementSelectOptionConfig {
  value: string,
  displayValue: string
};

interface DOM_ElementSelectConfig {
  options: DOM_ElementSelectOptionConfig[]
};

interface DOM_ElementInput {
  elementType: string,
  elementConfig: DOM_ElementInputConfig,
  value: string
};

interface DOM_ElementOption {
  elementType: string,
  elementConfig: DOM_ElementSelectConfig,
  value: string
};


interface OrderForm {
  [fieldName: string]: DOM_ElementInput | DOM_ElementOption
};

export interface OrderFormData {
  [fieldName: string]: any
};

interface ContactDataState {
  orderForm: OrderForm,
  loading: boolean
};

export interface IContactDataProps extends RouteComponentProps {
  ingredients: IIngredient,
  price: number
};

class ContactData extends Component<IContactDataProps, ContactDataState> {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeHolder: 'Your Name'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeHolder: 'Your E-Mail'
        },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeHolder: 'Street'
        },
        value: ''
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeHolder: 'ZIP Code'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeHolder: 'Country'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        },
        value: ''
      }
    },
    loading: false
  } as ContactDataState;

  orderHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {} as OrderFormData;
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
    const order = {
      id: undefined,
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    } as IOrder;

    axios.post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };

  inputChangedHandler = (event: any, inputIdentifier: string) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    this.setState({ orderForm: updatedOrderForm });
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
            changed={(event: any,) => { this.inputChangedHandler(event, formElement.id) }} />
        ))}
        <Button
          btnType="Success"
          clicked={(event: FormEvent<HTMLFormElement>) => { this.orderHandler(event) }}>
          ORDER
          </Button>
      </form>
    );
    if (this.state.loading) {
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

export default ContactData;