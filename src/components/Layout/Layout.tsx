import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';

export interface ILayoutProps {

};

export interface ILayoutState {
  showSideDrawer: boolean
};

class Layout extends Component<ILayoutProps, ILayoutState>  {
  state = {
    showSideDrawer: true
  } as ILayoutState;

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState((prevState: ILayoutState) => {
      return { showSideDrawer: !prevState.showSideDrawer }
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler} />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    )
  }
};

export default Layout;