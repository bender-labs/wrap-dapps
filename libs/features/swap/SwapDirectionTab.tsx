import React, { useCallback } from 'react';
import { styled, Tab, Tabs, TabsProps } from '@material-ui/core';
import { useHistory } from 'react-router';

const StyledTabs = styled(Tabs)(() => ({
  color: 'white',
  marginBottom: '10px'
}));

const StyledTab = styled(Tab)(() => ({
  textTransform: 'none',
  fontWeight: 900
}));

enum WrapDirection {
  WRAP = 'wrap',
  UNWRAP = 'unwrap'
}

export type SwapDirectionTabProps = {
  direction: WrapDirection
} & TabsProps;

export const SwapDirectionTab: React.FC<SwapDirectionTabProps> = ({ direction }) => {
  const history = useHistory();

  const onTabChange = useCallback(
    (event: React.ChangeEvent<{}>, newPath: string) => {
      history.push(newPath);
    },
    [history]
  );

  return (
    <StyledTabs
      value={direction}
      onChange={onTabChange}
      indicatorColor='primary'
      variant='fullWidth'
    >
      <StyledTab label={direction === WrapDirection.WRAP ? 'wrapping' : 'wrap'} value={direction} />
      <StyledTab label={direction === WrapDirection.UNWRAP ? 'unwrapping' : 'unwrap'} value={direction} />
    </StyledTabs>
  );
};
