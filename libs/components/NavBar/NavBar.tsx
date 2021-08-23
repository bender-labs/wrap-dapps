import { AppBar, Box, Grid, IconButton, Link, styled, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import DrawerComp from '../drawer/DrawerComp';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import logo from './logo.png';
import { EthereumConnectionButton, TezosConnectionButton } from '../../features/wallet';
import LaunchIcon from '@material-ui/icons/Launch';
import { AppRoute } from '../routes';
import OperationHistoryDialog from '@wrap-dapps/features/operations/components/OperationHistoryDialog';

const StyledAppbar = styled(AppBar)(() => (
  {
    background: 'transparent',
    boxShadow: 'none'
  }
));

const StyledToolbar = styled(Toolbar)(() => (
  {
    color: '#FFFFFF',
    minHeight: 110
  }
));

const StyledTypography = styled(Typography)(({ theme }) => (
    {
      flexGrow: 1,
      '& > *': {
        marginLeft: theme.spacing(2)
      },
      fontSize: '1rem',
      fontWeight: 900,
      '& > a': {
        lineHeight: '19px',
        borderRadius: '20px',
        border: '1px solid transparent',
        padding: '6px 10px',
        '& > svg': {
          display: 'none'
        },
        '&:hover': {
          textDecoration: 'none',
          border: '1px solid #FFD000',

          '& > svg': {
            display: 'inline'
          }
        }
      }
    }
  )
);

const Logo = styled('img')(({ theme }) => ({
  width: 50,
  marginLeft: theme.spacing(4)
}));

const StyledLaunchIcon = styled(LaunchIcon)(() => ({
  fontSize: '0.8rem'
}));

const PendingButton = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(1)
}));

const Wallets = styled(Box)(({ theme }) => ({
  '& > *': {
    marginRight: theme.spacing(3)
  }
}));

const MenuButton = styled(IconButton)(({ theme }) => (
  {
    marginRight: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  }
));

type Props = {
  routes: AppRoute[],
  showOperationHistory: boolean,
  showTezosWallet: boolean,
  showEthereumWallet: boolean
};

export default (props: Props) => {
  const { routes , showEthereumWallet, showTezosWallet, showOperationHistory} = props;
  const [mobileOpen, setMobileOpen] = React.useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const buildNavLinks = (routes: AppRoute[]) => {
    return routes.filter(route => route.navRoute).map((route) => (
      <Grid item key={route.path}>
        <StyledTypography variant='h6' component='h1'>
          <Link component={RouterLink} color='inherit' to={route.path}>
            {route.name} {route.external ? <StyledLaunchIcon/> : null}
          </Link>
        </StyledTypography>
      </Grid>
    ));
  };

  return (
    <>
      <StyledAppbar position='static'>
        <StyledToolbar>
          <Grid container={true} direction='row' justifyItems='flex-start' alignItems='center' sx={{ flex: 2 }}>
            <Grid item>
              <Logo src={logo} alt='Logo' />
            </Grid>
            <Box sx={{ display: { xs: 'none', sm: 'inherit' } }}>
              {buildNavLinks(routes)}
            </Box>
          </Grid>
          <Grid container={true} direction='row' justifyItems='flex-end' alignItems='center' sx={{ flex: 2 }}>
            <Box sx={{ display: { xs: 'none', sm: 'inherit' } }}>
              {showOperationHistory &&
              <Grid item>
                <PendingButton>
                  <OperationHistoryDialog/>
                </PendingButton>
              </Grid>}
              {showTezosWallet && <Grid item>
                <Wallets>
                  <TezosConnectionButton />
                </Wallets>
              </Grid>}
              {showEthereumWallet && <Grid item>
                <Wallets>
                  <EthereumConnectionButton />
                </Wallets>
              </Grid>}
            </Box>
          </Grid>
          <MenuButton color='inherit' aria-label='open drawer' edge='start' onClick={handleDrawerToggle}>
            <MenuIcon />
          </MenuButton>
        </StyledToolbar>
      </StyledAppbar>
      <DrawerComp open={mobileOpen} onClose={handleDrawerToggle} routes={routes} />
    </>
  );
};
