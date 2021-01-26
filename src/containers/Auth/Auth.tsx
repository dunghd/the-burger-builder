import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import { IOrderFormValidation, I_DOM_ElementInput } from '../Checkout/ContactData/ContactData';
import classes from './Auth.module.css';
import * as actions from '../../store/actions';
import { error } from 'console';

type AuthFormControls = {
  [fieldName: string]: I_DOM_ElementInput
};

type AuthState = {
  controls: AuthFormControls,
  isSignUp: boolean
};

export interface IAuthProps { 
  onAuth: (email: string, password: string, isSignUp: boolean) => void,
  loading: boolean,
  error: Error
};

class Auth extends Component<IAuthProps, AuthState> {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeHolder: 'Mail Address'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeHolder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignUp: true
  } as AuthState;

  checkValidity = (value: string, rules?: IOrderFormValidation): boolean => {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid
    }

    return isValid;
  };

  inputChangedHandler = (event: any, controlName: string) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    };
    this.setState({ controls: updatedControls });
  };

  submitHandler = (event: any) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp);
  };

  switchAuthModeHandler = () => {
    this.setState((prevState:AuthState) => {
      return { isSignUp: !prevState.isSignUp } as AuthState;
    })
  };

  render() {
    const formElementArray = [];
    for (const key in this.state.controls) {
      formElementArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let form = !this.props.loading ? <>{formElementArray.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event: any,) => { this.inputChangedHandler(event, formElement.id) }} />
    ))}</> : <Spinner/>;

    let errorMessage = this.props.error !== null ?
      <p>{this.props.error.message}</p> : null;

    return (
      <div className={classes.Auth}>
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button
            btnType="Success"
            clicked={() => { }}>SUBMIT</Button>
        </form>
        <Button 
          btnType={'Danger'}
          clicked={this.switchAuthModeHandler}>
            SWITCH TO {this.state.isSignUp ? 'SIGN IN': 'SIGN UP'}</Button>
      </div>
    );
  };
};

const mapStateToProps = (state: any) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error
  } as IAuthProps;
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onAuth: (email: string, password: string, isSignUp: boolean) => dispatch(actions.auth(email, password, isSignUp))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);