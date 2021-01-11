import React, { Component } from 'react';
import { IIngredient } from '../../../components/Burger/BurgerIngredient/BurgerIngredient';

import Button from '../../../components/UI/Button/Button';
import { IOrder } from '../../BurgerBuilder/BurgerBuilder';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { RouteComponentProps } from 'react-router-dom';

type ContactDataState = {
  name: string,
  email: string,
  address: {
    street: string,
    postalCode: string
  },
  loading: boolean
};

export interface IContactDataProps extends RouteComponentProps {
  ingredients: IIngredient,
  price: number
};

class ContactData extends Component<IContactDataProps, ContactDataState> {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    price: 0,
    loading: false
  } as ContactDataState;

  orderHandler = (event: Event) => {
    event.preventDefault();

    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'DDH',
        address: {
          street: 'Bach Dang',
          zipCode: '72108',
          country: 'Vietnam'
        },
        email: 'test@email.com',
      },
      deliveryMethod: 'fastest'
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
    let form = (
      <form>
        <input className={classes.Input} type="text" name="name" placeholder="Your name" />
        <input className={classes.Input} type="text" name="email" placeholder="Your email" />
        <input className={classes.Input} type="text" name="street" placeholder="Street" />
        <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
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