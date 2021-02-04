import React, { Component, PropsWithChildren } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../../store/actions';

type LogoutState = {};

export interface ILogoutProps {
  onLogout: () => void
};

class Logout extends Component<PropsWithChildren<ILogoutProps>, LogoutState> {
  componentDidMount() {
    this.props.onLogout();
  }

  render() {
    return (
      <Redirect to="/" />
    );
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onLogout: () => dispatch(actions.logout())
  };
};

export default connect(null, mapDispatchToProps)(Logout);
