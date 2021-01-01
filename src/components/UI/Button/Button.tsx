import React from 'react';

import classes from './Button.module.css';

export interface IButtonProps {
  clicked: () => void,
  btnType: keyof typeof classes
};

const button = (props: React.PropsWithChildren<IButtonProps>) => {
  return (
    <button
      className={[classes.Button, classes[props.btnType]].join(' ')}
      onClick={props.clicked} > { props.children}</button >
  );
};

export default button;