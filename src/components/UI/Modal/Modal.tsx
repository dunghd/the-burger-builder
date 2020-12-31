import React from 'react';

import classes from './Modal.module.css';

export interface IModalProps {
  show: boolean
};

const modal = (props: React.PropsWithChildren<IModalProps>) => {
  return (
    <div
      className={classes.Modal}
      style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0'
      }}>
      {props.children}
    </div>
  )
};

export default modal;