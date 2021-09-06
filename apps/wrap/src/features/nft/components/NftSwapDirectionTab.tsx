import React, { useCallback } from 'react';
import { styled, Tab, Tabs, TabsProps } from '@material-ui/core';
import { useHistory } from 'react-router';
import { paths } from '../../../pages/routes';
import { useRouteMatch } from 'react-router-dom';

const StyledTabs = styled(Tabs)(() => ({
  color: 'white',
  marginBottom: '10px'
}));

const StyledTab = styled(Tab)(() => ({
  color: 'white',
  textTransform: 'none',
  fontWeight: 900
}));

export const NftSwapDirectionTab: React.FC<TabsProps> = () => {
  const history = useHistory();
  const { path } = useRouteMatch();
  const onTabChange = useCallback(
    (event: React.ChangeEvent<{}>, newPath: string) => {
      history.push(newPath);
    },
    [history]
  );

  return (
    <StyledTabs value={path} onChange={onTabChange} indicatorColor='primary' variant='fullWidth'>
      <StyledTab label={path === paths.ETHEREUM_DASHBOARD ? 'wrapping' : 'wrap'} value={paths.ETHEREUM_DASHBOARD}/>
      <StyledTab label={path === paths.TEZOS_DASHBOARD ? 'unwrapping' : 'unwrap'} value={paths.TEZOS_DASHBOARD}/>
    </StyledTabs>
  );
};
