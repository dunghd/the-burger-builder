import React, { PropsWithChildren } from 'react';

import Aux from '../../hoc/Auxiliary';
import classes from './Layout.module.css';

export interface ILayoutProps {

};

const layout = (props: PropsWithChildren<ILayoutProps>) => (
  <Aux>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main className={classes.Content}>
      {props.children}
    </main>
  </Aux>
);

export default layout;