import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Drawer, Link, List, ListItem, styled } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { AppRoute } from '../routes';

const drawerWidth = 240;

const DrawerRoot = styled('div')(() => ({
  display: 'flex'
}));

const DrawerNav = styled('nav')(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    width: drawerWidth,
    flexShrink: 0
  }
}));

const StyledDrawer = styled(Drawer)(() => ({
  width: drawerWidth,
  background: '#E5E5E5'
}));

const DrawerButton = styled('button')(() => ({
  border: 'none',
  background: '#E5E5E5',
  '&:focus': {
    outline: 0
  }
}));

const DrawerLink = styled(Link)(() => ({
  color: '#000000'
}));

interface Props {
  window?: () => Window;
  open: boolean;
  onClose: () => void;
  routes: AppRoute[];
}

export default function DrawerComp(props: Props) {
  const { window, open, onClose, routes } = props;
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <DrawerRoot>
      <DrawerNav>
        <Box sx={{ display: { sm: 'none' } }}>
          <StyledDrawer
            container={container}
            variant='temporary'
            open={!open}
            onClose={onClose}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            <div>
              <DrawerButton onClick={onClose}>
                <CloseIcon />
              </DrawerButton>
              <List>
                {routes.map((route) => (
                  <ListItem key={route.path}>
                    <DrawerLink component={RouterLink} to={route.path} onClick={onClose}>
                      {route.name}
                    </DrawerLink>
                  </ListItem>
                ))}
              </List>
            </div>
          </StyledDrawer>
        </Box>
      </DrawerNav>
    </DrawerRoot>
  );
}
