import React from 'react'
import TezosConnectionButton from '../wallet/tezos/TezosConnectionButton';
import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    main: {
      width: '100%',
      display: 'flex',
      listStyleType: 'none'
    },
    button: {
      flex: 1,
      textAlign: 'right',
      paddingRight: '100px'
    },
    logo: {
      flex: 1,
      textAlign: 'left'
    }
  })

)

export default function NavBar() {
  const classes = useStyles()
  return (
    <>
      <ul id="nav" className={classes.main}>
        <li className={classes.logo}>Bender Labs</li>

        <li className={classes.button}><TezosConnectionButton/></li>
      </ul>
    </>
  )
}