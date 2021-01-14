import React from 'react';

import classes from './Button.module.css';

export interface IButtonProps {
  clicked: (event: any) => void,
  btnType: keyof typeof classes,
  disabled?: boolean
};

const button = (props: React.PropsWithChildren<IButtonProps>) => {
  return (
    <button
      className={[classes.Button, classes[props.btnType]].join(' ')}
      onClick={props.clicked}
      disabled={props.disabled}>{props.children}</button >
  );
};

export default button;