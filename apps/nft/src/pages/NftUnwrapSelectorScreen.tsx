import React, { useState } from 'react';
import { CardContent, Container } from '@material-ui/core';
import { SupportedBlockchain, useEthereumWalletContext, useTezosWalletContext } from '@wrap-dapps/features';
import { HalfCard, TokenSelection, useNonFungibleTokens } from '@wrap-dapps/components';
import { useTezosNftQuery } from '../features/nft/hook/useTezosNftQuery';
import Gallery, { GalleryDirection } from '../features/nft/components/Gallery';
import Stack from '@material-ui/core/Stack';
import Pagination from '@material-ui/core/Pagination';

export const NftUnwrapSelectorScreen = () => {
  const { tezosAccount } = useTezosWalletContext();
  const { ethereumLibrary } = useEthereumWalletContext();
  const nonFungibleTokens = useNonFungibleTokens();
  const [selectedNftCollection, setSelectedNftCollection] = useState(nonFungibleTokens[Object.keys(nonFungibleTokens)[0]]);
  const [pagination, setPagination] = useState({ currentPage: 1, limitPerPage: 4 });

  const nftQuery = useTezosNftQuery({
    tezosAccount: tezosAccount()!,
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
        <Gallery nftQuery={nftQuery} direction={GalleryDirection.UNWRAP} linkLabel='Send to Ethereum' />
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