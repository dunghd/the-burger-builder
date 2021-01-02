import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.module.css'

export interface INavigationItemsProps { };

const navigationItems = (props: React.PropsWithChildren<INavigationItemsProps>) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" active={true}>Burger Builder</NavigationItem>
    <NavigationItem link="/">Checkout</NavigationItem>
  </ul>
);

export default navigationItems;