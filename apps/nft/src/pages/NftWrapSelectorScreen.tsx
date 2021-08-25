import React, { useState } from 'react';
import { CardContent, Container } from '@material-ui/core';
import Stack from '@material-ui/core/Stack';
import Pagination from '@material-ui/core/Pagination';
import { HalfCard, TokenSelection, useEthereumWalletContext, useNonFungibleTokens } from '@wrap-dapps/components';
import Gallery, { GalleryDirection } from '../features/nft/components/Gallery';
import { useEthereumNftQuery } from '../features/nft/hook/useEthereumNftQuery';
import { SupportedBlockchain } from '@wrap-dapps/features';

export const NftWrapSelectorScreen = () => {
  const { ethereumAccount, ethereumLibrary } = useEthereumWalletContext();
  const nonFungibleTokens = useNonFungibleTokens();
  const [selectedNftCollection, setSelectedNftCollection] = useState(nonFungibleTokens[Object.keys(nonFungibleTokens)[0]]);
  const [pagination, setPagination] = useState({ currentPage: 1, limitPerPage: 4 });

  const nftQuery = useEthereumNftQuery({
    ethereumAccount: ethereumAccount()!,
    nftCollection: selectedNftCollection,
    ethereumToolkit: ethereumLibrary()!,
    ...pagination
  });

  const [page, setPage] = useState(1);
  const changePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setPagination({ ...pagination, currentPage: value });
  };

  return (
    <>
      <Container>
        <HalfCard>
          <CardContent>
            <TokenSelection
              token={selectedNftCollection.ethereumSymbol}
              disabled={false}
              onTokenSelect={(tokenId) => {
                setSelectedNftCollection(nonFungibleTokens[tokenId]);
              }}
              blockchainTarget={SupportedBlockchain.Ethereum}
              tokens={nonFungibleTokens}
            />
          </CardContent>
        </HalfCard>
      </Container>
      <Container maxWidth={'lg'} sx={{ padding: 3 }}>
        <Gallery nftQuery={nftQuery} direction={GalleryDirection.WRAP} linkLabel='Send to Tezos' />
      </Container>
      <Container>
        <Stack spacing={2}>
          <Pagination
            color={'primary'}
            page={page}
            count={Math.ceil(nftQuery.totalTokens / 4)}
            onChange={changePage}
          />
        </Stack>
      </Container>
    </>
  );
};