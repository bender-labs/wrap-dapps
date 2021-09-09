import { useHistory } from 'react-router';
import { useRouteMatch } from 'react-router-dom';
import React, { useCallback } from 'react';
import { styled, Tab, Tabs } from '@mui/material';
import { paths } from '../../../pages/routes';

const StyledTabs = styled(Tabs)(() => ({
  marginBottom: '10px'
}));

const StyledTab = styled(Tab)(() => ({
  color: 'white'
}));

export default function HistoryTab() {
  const history = useHistory();
  const { path } = useRouteMatch();
  const onTabChange = useCallback(
    (event: React.ChangeEvent<{}>, newPath: string) => {
      history.push(newPath);
    },
    [history]
  );

  return <StyledTabs value={path} onChange={onTabChange} indicatorColor='primary'>
    <StyledTab label='Wraps' value={paths.HISTORY_WRAP} />
    <StyledTab label='Unwraps' value={paths.HISTORY_UNWRAP} />
    <StyledTab label='NFT Wraps' value={paths.HISTORY_WRAP_NFT} />
    <StyledTab label='NFT Unwraps' value={paths.HISTORY_UNWRAP_NFT} />
  </StyledTabs>;
}