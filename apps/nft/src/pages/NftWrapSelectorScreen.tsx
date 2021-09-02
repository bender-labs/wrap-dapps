import React, { useState } from 'react';
import { CardContent, Container, Typography } from '@material-ui/core';
import Pagination from '@material-ui/core/Pagination';
import { HalfCard, TokenSelection, useEthereumWalletContext, useNonFungibleTokens } from '@wrap-dapps/components';
import Gallery, { GalleryDirection } from '../features/nft/components/Gallery';
import { useEthereumNftQuery } from '../features/nft/hook/useEthereumNftQuery';
import { SupportedBlockchain } from '@wrap-dapps/features';
import CircularProgress from '@material-ui/core/CircularProgress';
import { NftSwapDirectionTab } from '../features/nft/components/NftSwapDirectionTab';

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
        <NftSwapDirectionTab />
        <HalfCard>
          <CardContent sx={{ padding: 4 }}>
            <Typography>Choose an NFT Collection :</Typography>
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
      {nftQuery.loading ?
        <Container maxWidth='lg' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress color='primary' />
        </Container>
        :
        <Gallery nftQuery={nftQuery} direction={GalleryDirection.WRAP} linkLabel='Send to Tezos' />
      }
      {!nftQuery.loading && nftQuery.totalTokens > pagination.limitPerPage ?
        <Container maxWidth='lg' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, paddingBottom: 10, minHeight: '0' }}>
          <Pagination
            color={'primary'}
            page={page}
            count={Math.ceil(nftQuery.totalTokens / 4)}
            onChange={changePage}
          />
        </Container>
        :
        <></>
      }
    </>
  );
};