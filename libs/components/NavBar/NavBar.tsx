import { AppBar, Box, Grid, IconButton, Link, styled, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DrawerComp from '../drawer/DrawerComp';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import logo from './logo.png';
import { EthereumConnectionButton, TezosConnectionButton } from '../../features/wallet';
import LaunchIcon from '@mui/icons-material/Launch';
import { AppRoute } from '../routes';
import OperationHistoryDialog from '@wrap-dapps/features/operations/components/OperationHistoryDialog';

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
  marginLeft: theme.spacing(4),
  marginRight: theme.spacing(4)
}));

const StyledLaunchIcon = styled(LaunchIcon)(() => ({
  fontSize: '0.8rem'
}));

const MenuButton = styled(IconButton)(({ theme }) => (
  {
    marginRight: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
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
  const { routes, showEthereumWallet, showTezosWallet, showOperationHistory } = props;
  const [mobileOpen, setMobileOpen] = React.useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const buildNavLinks = (routes: AppRoute[]) => {
    return routes.filter(route => route.navRoute).map((route) => (
      <Grid item key={route.path}>
        <StyledTypography variant='h6'>
          <Link component={RouterLink} color='inherit' to={route.path} underline='none'>
            {route.name} {route.external ? <StyledLaunchIcon /> : null}
          </Link>
        </StyledTypography>
      </Grid>
    ));
  };

  const externalLinks = () => {
    return (
      <>
        <Grid item key='liquidity-external'>
          <StyledTypography variant='h6'>
            <Link component={RouterLink} target="_blank" color='inherit' to={{ pathname: 'https://liquidity.tzwrap.com/' }}
                  underline='none'>
              Liquidity <StyledLaunchIcon />
            </Link>
          </StyledTypography>
        </Grid>
        <Grid item key='info-external'>
          <StyledTypography variant='h6'>
            <Link component={RouterLink} target="_blank" color='inherit' to={{ pathname: 'https://info.tzwrap.com/' }} underline='none'>
              Info <StyledLaunchIcon />
            </Link>
          </StyledTypography>
        </Grid>
      </>
    );
  };

  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <Grid container direction='row' alignItems='center'>
            <Grid item>
              <Logo src={logo} alt='Logo' />
            </Grid>
            <Box sx={{ display: { xs: 'none', md: 'inherit' } }}>
              {buildNavLinks(routes)}
              {externalLinks()}
            </Box>
          </Grid>
          <Grid container direction='row' justifyContent='flex-end' alignItems='center'
                sx={{ display: { xs: 'none', md: 'inherit' } }}>
            {showOperationHistory &&
            <Grid item>
              <OperationHistoryDialog />
            </Grid>}
            {showTezosWallet && <Grid item>
              <Box sx={{ margin: 1 }}>
                <TezosConnectionButton />
              </Box>
            </Grid>}
            {showEthereumWallet && <Grid item>
              <Box sx={{ margin: 1 }}>
                <EthereumConnectionButton />
              </Box>
            </Grid>}
          </Grid>
          <MenuButton color='inherit' aria-label='open drawer' edge='start' onClick={handleDrawerToggle}>
            <MenuIcon />
          </MenuButton>
        </Toolbar>
      </AppBar>
      <DrawerComp open={mobileOpen} onClose={handleDrawerToggle} routes={routes} />
    </>
  );
};
