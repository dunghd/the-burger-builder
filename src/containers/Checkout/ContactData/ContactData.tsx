import React, { Component } from 'react';
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
  name: DOM_ElementInput,
  email: DOM_ElementInput,
  street: DOM_ElementInput,
  zipCode: DOM_ElementInput,
  country: DOM_ElementInput,
  deliveryMethod: DOM_ElementOption
}

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
        value: 'DDH'
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeHolder: 'Your E-Mail'
        },
        value: 'test@email.com'
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeHolder: 'Street'
        },
        value: 'Bach Dang'
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeHolder: 'ZIP Code'
        },
        value: '72108'
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeHolder: 'Country'
        },
        value: 'Vietnam'
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        },
        value: 'fastest'
      }
    },
    loading: false
  } as ContactDataState;

  orderHandler = (event: Event) => {
    event.preventDefault();

    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
    } as IOrder;

    axios.post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false });
        // this.props.history.push('/');
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };

  render() {
    const formElementArray = [];
    for (const key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key as keyof OrderForm]
      });
    }
    let form = (
      <form>
        {formElementArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value} />
        ))}
        <Button btnType="Success" clicked={(event: Event) => { this.orderHandler(event) }}>ORDER</Button>
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