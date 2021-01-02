import React from 'react';

import classes from './NavigationItem.module.scss'

export interface INavigationItemProps {
  link: string,
  active?: boolean
};

const navigationItem = (props: React.PropsWithChildren<INavigationItemProps>) => (
  <li className={classes.NavigationItem}>
    <a
      href={props.link}
      className={props.active ? classes.active : ''}>
      {props.children}
    </a>
  </li>
);

export default navigationItem;