import React, { useState } from 'react';
import { CardContent, Container, Typography } from '@mui/material';
import { SupportedBlockchain, useEthereumWalletContext, useTezosWalletContext } from '@wrap-dapps/features';
import { HalfCard, TokenSelection, useNonFungibleTokens } from '@wrap-dapps/components';
import { useTezosNftQuery } from '../../features/nft/hook/useTezosNftQuery';
import Gallery, { GalleryDirection } from '../../features/nft/components/Gallery';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import { NftSwapDirectionTab } from '../../features/nft/components/NftSwapDirectionTab';

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
        <Gallery nftQuery={nftQuery} direction={GalleryDirection.UNWRAP} linkLabel='Send to Ethereum' />
      }
      {!nftQuery.loading && nftQuery.totalTokens > pagination.limitPerPage ?
        <Container maxWidth='lg' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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