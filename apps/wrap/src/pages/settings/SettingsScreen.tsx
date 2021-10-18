import {
  Box,
  Container,
  styled,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl, Button
} from '@mui/material';
import React, { useState } from 'react';
import { HeaderPage } from '../HeaderPage';
import { RPCNode, useConfig, useRpcNodeUpdate } from '@wrap-dapps/components';
import { WrapStatus } from '@wrap-dapps/features';

const ContainBox = styled(Box)(() => ({
  borderRadius: '0 0 10px 10px',
  padding: '30px',
  backgroundColor: '#e5e5e5'
}));

const FirstSubtitle = styled(Typography)(() => ({
  color: '#000000',
  textAlign: 'center',
  marginBottom: '20px'
}));

const StyledPaperContent = styled(Box)(() => ({
  borderRadius: '0 0 10px 10px',
  padding: '20px',
  backgroundColor: 'white'
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: 'black',
  backgroundColor: 'rgba(0, 0, 0, 0.05)',
  width: '40%',
  borderRadius: '25px',
  float: 'right',
  boxShadow: 'none',
  textTransform: 'none',
  fontWeight: 900,
  '&:active': {
    boxShadow: 'none'
  },
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    boxShadow: 'none'
  }
}));


export default function SettingsScreen() {
  const { rpcNodes, tezos: {rpcUrl} } = useConfig();
  const updateRpcNode = useRpcNodeUpdate();
  const [currentNodeUrlSelection, setCurrentNodeUrlSelection] = useState<string | undefined>(rpcUrl);

  const handleChange = (event) => {
    setCurrentNodeUrlSelection(event.target.value);
  };

  const changeNode = () => {
    if (currentNodeUrlSelection !== undefined) {
      updateRpcNode(currentNodeUrlSelection);
    }
  };

  return (
    <Container maxWidth={'sm'}>
      <HeaderPage title='Settings' subtitle='' />
      <ContainBox>
        <StyledPaperContent>
          <FirstSubtitle variant={'subtitle1'}>Choose your default Tezos RPC Node:</FirstSubtitle>
          <FormControl component='fieldset'>
            <RadioGroup
              aria-label='node'
              name='radio-buttons-group'
              value={currentNodeUrlSelection}
              onChange={handleChange}
            >
              {rpcNodes?.map(node => (<FormControlLabel key={node.url} value={node.url} control={<Radio />} label={`${node.name} (${node.url})`} />))}
            </RadioGroup>
          </FormControl>
          <Box sx={{
            borderRadius: '0 0 10px 10px',
            minHeight: '40px',
            padding: '30px 0px'
          }}>
              <StyledButton
                variant={'contained'}
                color={'primary'}
                onClick={changeNode}
                disabled={currentNodeUrlSelection === rpcUrl}
              >
                Validate
              </StyledButton>
          </Box>
        </StyledPaperContent>
      </ContainBox>
    </Container>
  );
}
