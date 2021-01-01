import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

import classes from './Modal.module.css';

export interface IModalProps {
  show: boolean,
  modalClosed: () => void
};

const modal = (props: React.PropsWithChildren<IModalProps>) => {
  return (
    <Auxiliary>
      <Backdrop
        show={props.show}
        click={props.modalClosed} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0'
        }}>
        {props.children}
      </div>
    </Auxiliary>
  )
};

export default modal;