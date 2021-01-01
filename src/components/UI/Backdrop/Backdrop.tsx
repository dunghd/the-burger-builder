import React from 'react';

import classes from './Backdrop.module.css';

export interface IBackdropProps {
  show: boolean;
  click: () => void
};

const backdrop = (props: React.PropsWithChildren<IBackdropProps>) => (
  props.show ?
    <div
      className={classes.Backdrop}
      onClick={props.click}>
    </div> : null
);

export default backdrop;