import React, { useCallback } from 'react';
import { styled, Tab, Tabs, TabsProps } from '@mui/material';
import { useHistory } from 'react-router';
import { useRouteMatch } from 'react-router-dom';
import { paths } from '../../../pages/routes';

const StyledTabs = styled(Tabs)(() => ({
  color: 'white',
  marginBottom: '10px'
}));

const StyledTab = styled(Tab)(() => ({
  color: 'white',
  textTransform: 'none',
  fontWeight: 900
}));

export const SwapDirectionTab: React.FC<TabsProps> = () => {
  const history = useHistory();
  const { path } = useRouteMatch();
  const onTabChange = useCallback(
    (event: React.ChangeEvent<{}>, newPath: string) => {
      history.push(newPath);
    },
    [history]
  );

  return (
    <StyledTabs
      value={path}
      onChange={onTabChange}
      indicatorColor='primary'
      variant='fullWidth'
    >
      <StyledTab label={path === paths.WRAP ? 'wrapping' : 'wrap'} value={paths.WRAP} />
      <StyledTab label={path === paths.UNWRAP ? 'unwrapping' : 'unwrap'} value={paths.UNWRAP} />
    </StyledTabs>
  );
};
