import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.module.css'

export interface INavigationItemsProps {
  isAuthenticated: boolean
};

const navigationItems = (props: React.PropsWithChildren<INavigationItemsProps>) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>Burger Builder</NavigationItem>
    {props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
    {!props.isAuthenticated
      ? <NavigationItem link="/auth">Authenticate</NavigationItem>
      : <NavigationItem link="/logout">Logout</NavigationItem>}
  </ul>
);

export default navigationItems;