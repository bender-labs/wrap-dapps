import React, {useCallback} from 'react';
import {Card, CardContent, Tab, Tabs, TabsProps,} from '@material-ui/core';
import {useHistory} from 'react-router';
import {useRouteMatch} from 'react-router-dom';

export const SwapDirectionTab: React.FC<TabsProps> = () => {
  const history = useHistory();
  const {path} = useRouteMatch();
  const onTabChange = useCallback(
    (event: React.ChangeEvent<{}>, newPath: string) => {
      history.push(newPath);
    },
    [history]
  );

  return (
    <Tabs
      value={path}
      onChange={onTabChange}
      indicatorColor="primary"
      variant="fullWidth"
    >
      <Tab
        label={path === 'WRAP' ? 'wrapping' : 'wrap'}
        value={'paths.WRAP'}
      />
      <Tab
        label={path === 'UNWRAP' ? 'unwrapping' : 'unwrap'}
        value={'paths.UNWRAP'}
      />
    </Tabs>
  );
};


export default function TabsCard() {
  return (
    <Card>
      <CardContent>
        <SwapDirectionTab />
      </CardContent>
    </Card>
  )

}

