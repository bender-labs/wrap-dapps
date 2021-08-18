import React, { useState } from 'react';
import { CardContent, Container } from '@material-ui/core';
import Stack from '@material-ui/core/Stack';
import Pagination from '@material-ui/core/Pagination';
import {
  EthereumConnected,
  HalfCard,
  TokenSelection,
  useEthereumWalletContext,
  useNonFungibleTokens
} from '@wrap-dapps/components';
import Gallery from '../features/nft/Gallery';
import { useClientNtfBalance } from '../features/nft/hook/useClientNtfBalance';
import { SupportedBlockchain } from '@wrap-dapps/features';

export const NftWrapSelectorScreen = () => {
  const { ethereumAccount, ethereumLibrary } = useEthereumWalletContext();
  const nonFungibleTokens = useNonFungibleTokens();
  const [selectedToken, setSelectedToken] = useState(nonFungibleTokens[Object.keys(nonFungibleTokens)[0]]);
  const [pagination, setPagination] = useState({ currentPage: 1, limitPerPage: 4 });
  const userTokens = useClientNtfBalance({
    address: ethereumAccount()!,
    nftAddress: selectedToken.ethereumContractAddress,
    ethereumToolkit: ethereumLibrary()!,
    ...pagination
  });

  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setPagination({ ...pagination, currentPage: value });
  };

  return (
    <>
      <Container>
        <HalfCard>
          <CardContent>
            <TokenSelection
              token={selectedToken.ethereumSymbol}
              disabled={false}
              onTokenSelect={(tokenId) => {
                setSelectedToken(nonFungibleTokens[tokenId]);
              }}
              blockchainTarget={SupportedBlockchain.Ethereum}
              tokens={nonFungibleTokens}
            />
          </CardContent>
        </HalfCard>
      </Container>
      <Container maxWidth={'lg'} sx={{ padding: 3 }}>
        <Gallery tokens={userTokens.tokens} />
      </Container>
      <Container>
        <Stack spacing={2}>
          <Pagination
            color={'primary'}
            page={page}
            count={Math.ceil(userTokens.totalTokens / 4)}
            onChange={handleChange}
          />
        </Stack>
      </Container>
    </>
  );
};