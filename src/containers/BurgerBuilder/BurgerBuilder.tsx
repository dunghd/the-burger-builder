import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';

export interface IBurgerBuilderProps { };

export interface IBurgerBuilderState { };

class BurgerBuilder extends Component<IBurgerBuilderProps, IBurgerBuilderState> {
  render() {
    return (
      <Auxiliary>
        <div>Burger</div>
        <div>Build Controls</div>
      </Auxiliary>
    );
  }
}

export default BurgerBuilder;