import React, { PropsWithChildren } from 'react';

import classes from './BuildControl.module.css'

export interface IBuildControlProps {
  label: string,
  added: () => void,
  removed: () => void,
  disabled: boolean
};

const buildControl = (props: PropsWithChildren<IBuildControlProps>) => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button
      className={classes.Less}
      onClick={props.removed}
      disabled={props.disabled}>Less</button>
    <button
      className={classes.More}
      onClick={props.added}>More</button>
  </div>
);

export default buildControl;