import React, { Component } from 'react';
import classes from './Person.module.css';

export interface IPersonProps {
  id: string,
  name: string,
  age: number,
  click?: (event: any) => void,
  changed?: (event: any) => void,
  children?: React.ReactNode,
  isAuth: boolean
};

interface IPersonState { };

class Person extends Component<IPersonProps, IPersonState> {
  render() {
    console.log('[Person.tsx] rendering...');

    return (
      <div className={classes.Person}>
        DDH
      </div>
    );
  };
};