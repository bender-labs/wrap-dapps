import { useHistory } from 'react-router';
import { useRouteMatch } from 'react-router-dom';
import React, { useCallback } from 'react';
import { styled, Tab, Tabs } from '@mui/material';
import { paths } from '../../../pages/routes';

const StyledTabs = styled(Tabs)(() => ({
  color: 'white',
  marginBottom: '10px'
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
    <Tab label='Wraps' value={paths.HISTORY_WRAP} />
    <Tab label='Unwraps' value={paths.HISTORY_UNWRAP} />
  </StyledTabs>;
}