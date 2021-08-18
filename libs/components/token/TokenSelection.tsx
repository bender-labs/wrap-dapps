import { FormControl, FormHelperText, MenuItem, Select } from '@material-ui/core';
import React from 'react';
import { SupportedBlockchain } from '@wrap-dapps/features/wallet/blockchain';
import EthereumTokenIcon from './ethereum/EthereumTokenIcon';
import TezosTokenIcon from './tezos/TezosTokenIcon';
import { Token } from '@wrap-dapps/api';

type Props = {
  token: string;
  onTokenSelect: (token: string) => void;
  disabled: boolean;
  blockchainTarget: SupportedBlockchain;
  tokens: Record<string, Token>;
};

const itemLabel = (
  blockchainTarget: SupportedBlockchain,
  tokenMetadata: Token
) =>
  blockchainTarget === SupportedBlockchain.Ethereum
    ? `${tokenMetadata.ethereumName} (${tokenMetadata.ethereumSymbol})`
    : `${tokenMetadata.tezosName} (${tokenMetadata.tezosSymbol})`;

const itemIcon = (
  blockchainTarget: SupportedBlockchain,
  tokenMetadata: Token
) =>
  blockchainTarget === SupportedBlockchain.Ethereum ? (
    <EthereumTokenIcon tokenMetadata={tokenMetadata} />
  ) : (
    <TezosTokenIcon tokenMetadata={tokenMetadata} />
  );

function orderTokens(tokens: Record<string, Token>): [string, Token][] {
  return Object.entries(tokens).sort(([key1, metadata1], [, metadata2]) => {
    if (metadata1.ethereumName > metadata2.ethereumName) return 1;
    if (metadata1.ethereumName < metadata2.ethereumName) return -1;
    return 0;
  });
}

export function TokenSelection({
                                         token,
                                         tokens,
                                         disabled,
                                         blockchainTarget,
                                         onTokenSelect
                                       }: Props) {
  const tokenList = orderTokens(tokens);

  const handleTokenSelect = (event: any) => {
    event.preventDefault();
    onTokenSelect(event.target.value as string);
  };

  return (
    <FormControl fullWidth variant={'filled'}>
      <Select
        fullWidth
        disabled={disabled}
        value={token}
        onChange={handleTokenSelect}
        displayEmpty
        inputProps={{
          name: 'ethereumSymbol',
          id: 'token-selector'
        }}
      >
        {tokenList.map(([key, token]) => (
          <MenuItem value={key} key={key}>
            {itemIcon(blockchainTarget, token)}
            {itemLabel(blockchainTarget, token)}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>Only supported token are listed</FormHelperText>
    </FormControl>
  );
}
