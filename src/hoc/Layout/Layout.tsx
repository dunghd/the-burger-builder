import React, { Component, PropsWithChildren } from 'react';
import { connect } from 'react-redux';

import Aux from '../Auxiliary/Auxiliary';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';

export interface ILayoutProps {
  isAuthenticated: boolean
};

export interface ILayoutState {
  showSideDrawer: boolean
};

class Layout extends Component<PropsWithChildren<ILayoutProps>, ILayoutState>  {
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
        <Toolbar
          drawerToggleClicked={this.sideDrawerToggleHandler}
          isAuth={this.props.isAuthenticated} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
          isAuth={this.props.isAuthenticated} />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    )
  }
};

const mapStateToProps = (state: any) => {
  return {
    isAuthenticated: state.auth.idToken !== null && state.auth.idToken !== undefined
  };
};

export default connect(mapStateToProps)(Layout);