import React, { Component, PropsWithChildren } from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

import classes from './Modal.module.css';

export interface IModalProps {
  show: boolean,
  modalClosed?: () => void
};

export interface IModalState { };

class Modal extends Component<PropsWithChildren<IModalProps>, IModalState> {
  shouldComponentUpdate(nextProps: PropsWithChildren<IModalProps>, nextState: IModalState) {
    return nextProps.show !== this.props.show
      || nextProps.children !== this.props.children;
  }

  componentWillUpdate() {
    console.log(`[Modal] WillUpdate`);
  }

  render() {
    return (
      <Auxiliary>
        <Backdrop
          show={this.props.show}
          click={this.props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}>
          {this.props.children}
        </div>
      </Auxiliary>
    )
  }
};

export default Modal;