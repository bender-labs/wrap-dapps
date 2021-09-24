import React, { useState } from 'react';
import { CardContent, Container, Typography } from '@mui/material';
import {
  SupportedBlockchain,
  TezosStateType,
  useEthereumWalletContext,
  useTezosWalletContext
} from '@wrap-dapps/features';
import { HalfCard, TokenSelection, useEthereumConfig, useNonFungibleTokens } from '@wrap-dapps/components';
import { useTezosNftQuery } from '../../features/nft/hook/useTezosNftQuery';
import Gallery, { GalleryDirection } from '../../features/nft/components/Gallery';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import { NftSwapDirectionTab } from '../../features/nft/components/NftSwapDirectionTab';
import { NftQuery } from '../../features/nft/hook/useEthereumNftQuery';
import { ethers } from 'ethers';

export const NftUnwrapSelectorScreen = () => {
  const { tezosAccount, state: tezosState } = useTezosWalletContext();
  const { state: ethereumState } = useEthereumWalletContext();
  const nonFungibleTokens = useNonFungibleTokens();
  const [selectedNftCollection, setSelectedNftCollection] = useState(nonFungibleTokens[Object.keys(nonFungibleTokens)[0]]);
  const [pagination, setPagination] = useState({ currentPage: 1, limitPerPage: 4 });
  const ethereumConfig = useEthereumConfig();
  const infuraProvider = new ethers.providers.JsonRpcProvider(ethereumConfig.rpcUrl);

  const nftQuery = useTezosNftQuery({
    tezosAccount: tezosAccount()!,
    nftCollection: selectedNftCollection,
    ethereumToolkit: infuraProvider,
    ...pagination
  });

  const [page, setPage] = useState(1);
  const changePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setPagination({ ...pagination, currentPage: value });
  };

  const renderNftQuery = (nftQuery: NftQuery) => {
    return (
      <>
        {nftQuery.loading ?
          <Container maxWidth='lg' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress color='primary' />
          </Container>
          :
          <Gallery nftQuery={nftQuery} direction={GalleryDirection.UNWRAP} />
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

  return (
    <>
      <Container>
        <NftSwapDirectionTab />
        <HalfCard>
          <CardContent sx={{ padding: 4 }}>
            <Typography>Choose an NFT Collection :</Typography>
            <TokenSelection
              token={selectedNftCollection?.ethereumSymbol ?? ''}
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
      {tezosState.type === TezosStateType.CONNECTED ?
        renderNftQuery(nftQuery)
        :
        <Container maxWidth='lg'
                   sx={{
                     display: 'flex',
                     padding: 10,
                     justifyContent: 'center',
                     alignItems: 'center',
                     paddingTop: 20
                   }}>
          <Typography variant='h5' sx={{ color: 'white', display: 'flex' }}>Please connect your Tezos
            wallet</Typography>
        </Container>
      }
    </>
  );
};