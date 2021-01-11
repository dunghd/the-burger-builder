import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.module.scss'

export interface INavigationItemProps {
  link: string,
  exact?: boolean
};

const navigationItem = (props: React.PropsWithChildren<INavigationItemProps>) => (
  <li className={classes.NavigationItem}>
    <NavLink
      to={props.link}
      exact
      activeClassName={classes.active}>{props.children}</NavLink>
  </li>
);

export default navigationItem;