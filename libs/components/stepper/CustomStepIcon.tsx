import { createStyles, StepIconProps } from '@material-ui/core';
import React from 'react';
import CheckIcon from '@material-ui/icons/Check';
import clsx from 'clsx';
import theme from '../theme/theme';


  const root =  {
    backgroundColor: '#FFFFFF',
    zIndex: 1,
    color: '#000',
    fontWeight: 900,
    width: 32,
    height: 32,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const active = {
    backgroundColor: '#FFFFFF',
  };

  completed: {
    backgroundColor: theme.palette.primary.main
  };

export default function CustomStepIcon(props: StepIconProps) {
  const {active, completed} = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: completed ? <CheckIcon/> : <span>1</span>,
    2: completed ? <CheckIcon/> : <span>2</span>,
  };

  return (
    <div
      className={clsx(root, {
        'active': active,
        'completed': completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}
