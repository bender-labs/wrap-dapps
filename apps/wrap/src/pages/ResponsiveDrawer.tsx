import React, { PropsWithChildren } from 'react';
import { matchPath, NavLink as RouterLink, useLocation } from 'react-router-dom';
import { routes } from './routes';
import {
  AppBar,
  Box,
  Drawer,
  Grid,
  Hidden,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemText,
  styled,
  Toolbar,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logo from './logo.png';
import OperationHistoryDialog from '@wrap-dapps/features/operations/components/OperationHistoryDialog';
import { EthereumConnectionButton, TezosConnectionButton } from '@wrap-dapps/features';
import { DisplayEnvironment } from '@wrap-dapps/components';
import LaunchIcon from '@mui/icons-material/Launch';

const drawerWidth = 240;

const Root = styled('div')(() => ({
  display: 'flex'
}));

const MobileDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    paddingTop: theme.spacing(1),
    width: drawerWidth,
    backgroundColor: 'black',
    display: 'flex',
    flexDirection: 'column',
    '-webkit-box-pack': 'justify',
    justifyContent: 'space-between',
    height: '100vh'
  }
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    paddingTop: theme.spacing(1),
    width: drawerWidth,
    backgroundColor: 'rgba(0,0,0,0.3)',
    display: 'flex',
    flexDirection: 'column',
    '-webkit-box-pack': 'justify',
    justifyContent: 'space-between',
    height: '100vh'
  }
}));

const Content = styled('main')(({ theme }) => ({
  flexGrow: 1
}));

const Links = styled('div')(({ theme }) => ({
  paddingBottom: theme.spacing(2)
}));

const StyledLink = styled(Link)(() => ({
  color: 'white',
  textDecoration: 'none'
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  paddingBottom: theme.spacing(0.5),
  paddingLeft: theme.spacing(4),
  color: 'white'
}));

const ToolbarTitle = styled('div')(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  color: '#FFF',
  fontSize: '18px',
  fontWeight: 900,
  toolbar: theme.mixins.toolbar,
  marginBottom: theme.spacing(2)
}));

const Logo = styled('img')(({ theme }) => ({
  width: 50,
  marginRight: theme.spacing(1)
}));

const StyledItemListText = styled(ListItemText)(() => ({
  '& > span': {
    fontSize: '14px',
    fontWeight: 900
  }
}));

const ActiveRoute = styled('span')(({ theme }) => ({
  color: theme.palette.primary.main
}));

const StyledLaunchIcon = styled(LaunchIcon)(() => ({
  fontSize: '0.8rem'
}));

export function ResponsiveDrawer({ children }: PropsWithChildren<{}>) {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window.document.body : undefined;

  const isActive = (path: string, activePaths: string[]) => {
    return activePaths.findIndex(activePath => matchPath(path, activePath)) !== -1;
  };

  const buildNavLinks = (context: string) => {
    return routes.filter(route => route.navRoute).map((route) => {
      if (isActive(location.pathname, route.activePaths!)) {
        return (
          <StyledListItem
            button={true}
            key={context + route.name}
            component={RouterLink}
            to={route.path}
            exact
            sx={{
              paddingLeft: route.navRoute === 1 ? theme.spacing(4) : theme.spacing(6),
              paddingTop: route.navRoute === 1 ? theme.spacing(0.5) : 0
            }}
          >
            <ActiveRoute>
              <StyledItemListText primary={route.name} />
            </ActiveRoute>
          </StyledListItem>
        );
      }
      return (
        <StyledListItem
          button={true}
          key={context + route.name}
          component={RouterLink}
          to={route.path}
          exact
          sx={{
            paddingLeft: route.navRoute === 1 ? theme.spacing(4) : theme.spacing(6),
            paddingTop: route.navRoute === 1 ? theme.spacing(0.5) : 0
          }}
        >
          <StyledItemListText primary={route.name} />
        </StyledListItem>
      );
    }).concat([
      <StyledListItem button={true} key={context + 'info-dapp'} sx={{
        paddingLeft: theme.spacing(4),
        paddingTop: theme.spacing(0.5)
      }}>
        <StyledLink href={'https://info.tzwrap.com'} target={'_blank'} rel={'noreferrer'}>
          <StyledItemListText primary={<>Statistics&nbsp;&nbsp;<StyledLaunchIcon /></>} />
        </StyledLink>
      </StyledListItem>
    ]);
  };

  const header = (context: string) => (
    <Box sx={{ padding: 0, margin: 0 }}>
      <ToolbarTitle>
        <Logo src={logo} alt='Logo' /> WRAP protocol
      </ToolbarTitle>
      <List>
        {buildNavLinks(context)}
      </List>
    </Box>
  );

  const footer = (context: string) => (
    <Box sx={{ padding: 0, margin: 0 }}>
      <Links>
        <List sx={{ fontSize: '14px' }}>
          <StyledListItem button={true} key={context + 'tzwrap'}>
            <StyledLink href={'https://www.tzwrap.com'} target={'_blank'} rel={'noreferrer'}>
              tzwrap.com
            </StyledLink>
          </StyledListItem>
          <StyledListItem button={true} key={context + 'faq'}>
            <StyledLink href={'https://www.tzwrap.com/docs/wrap-protocol'} target={'_blank'} rel={'noreferrer'}>
              FAQ
            </StyledLink>
          </StyledListItem>
          <StyledListItem button={true} key={context + 'github'}>
            <StyledLink href={'https://github.com/bender-labs/wrap-dapps'} target={'_blank'} rel={'noreferrer'}>
              Github
            </StyledLink>
          </StyledListItem>
        </List>
      </Links>
      <DisplayEnvironment />
    </Box>
  );

  return (
    <Root>
      <Hidden smUp implementation='js'>
        <MobileDrawer
          container={container}
          variant='temporary'
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true
          }}
        >
          {header('mobile')}
          {footer('mobile')}
        </MobileDrawer>
      </Hidden>
      <Hidden smDown implementation='js'>
        <StyledDrawer variant='permanent' anchor={theme.direction === 'rtl' ? 'right' : 'left'} ModalProps={{
          keepMounted: true
        }}>
          {header('desktop')}
          {footer('desktop')}
        </StyledDrawer>
      </Hidden>
      <Content>
        <AppBar position='static' sx={{ padding: 0, marginBottom: 0 }}>
          <Toolbar sx={{ padding: 1 }}>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='start'
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' }, color: '#FFF' }}
            >
              <MenuIcon />
            </IconButton>
            <Grid container direction='row' justifyContent='flex-end' alignItems='center'
                  sx={{ display: { xs: 'none', sm: 'inherit' } }}>
              <Grid item>
                <OperationHistoryDialog />
              </Grid>
              <Grid item>
                <Box sx={{ margin: 1 }}>
                  <TezosConnectionButton />
                </Box>
              </Grid>
              <Grid item>
                <Box sx={{ margin: 1 }}>
                  <EthereumConnectionButton />
                </Box>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        {children}
      </Content>
    </Root>
  );
}
