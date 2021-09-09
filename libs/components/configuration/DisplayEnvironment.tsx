import { styled } from '@mui/material';
import React from 'react';
import { useConfig } from './ConfigProvider';

const StyledDiv = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  textAlign: 'center',
  fontSize: 12,
  color: '#FFFFFF'
}));

export function DisplayEnvironment() {
  const { environmentName, tezos, ethereum } = useConfig();

  return (
    <StyledDiv>
      {environmentName.charAt(0).toUpperCase() +
      environmentName.slice(1).toLowerCase()}
      {environmentName.toLowerCase() === 'testnet'
        ? ` (${tezos.networkName}/${ethereum.networkName})`
        : ''}
    </StyledDiv>
  );
}
