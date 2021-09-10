import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material';

const StyledInput = styled('input')(() => ({
  width: '100%',
  textAlign: 'center',
  padding: '30px 0',
  '& input': {
    fontFamily: 'inherit',
    textAlign: 'center',
    fontSize: 42
  }
}));

export function TezosAddressInput({ onRecipientChange }: { onRecipientChange: (tezosRecipientAddress: string) => void }) {
  const [inputValue, setInputValue] = useState<string>('');

  const onInputChange = (event: any) => {
    event.preventDefault();
    setInputValue( event.target.value as string);
  }

  useEffect(() => {
    const tezosAddressRegex = /tz1[A-Za-z0-9]{33}$/ig;
    if (tezosAddressRegex.test(inputValue)) {
      onRecipientChange(inputValue);
    } else {
      onRecipientChange('');
    }
  }, [inputValue]);

  return (
    <StyledInput placeholder='Recipient Tezos address' onChange={onInputChange} value={inputValue} maxLength={36}/>
  );
}