import React from 'react';

import classes from './DrawerToggle.module.css';

export interface IDrawerToggleProps {
  clicked: () => void
};

const drawerToggle = (props: React.PropsWithChildren<IDrawerToggleProps>) => (
  <div className={classes.DrawerToggle} onClick={props.clicked}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default drawerToggle;