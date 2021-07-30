import React from 'react';
import { Button, CardContent, Container, Typography } from '@material-ui/core';
import Stack from '@material-ui/core/Stack';
import Pagination from '@material-ui/core/Pagination';
import {
  MultiConnect,
  HalfCard,
  EthereumTokenSelection,
  useEthereumWalletContext,
  useTezosWalletContext,
  TezosStateType,
  EthereumStateType,
  useNonFungibleTokens
} from '@wrap-dapps/components';
import Gallery from './Gallery';
import { useEffect, useState } from 'react';
import { useClientNtfBalance } from './hook/useClientNtfBalance';
import { ethers } from 'ethers';

type ConnectedWrapContainerProps = {
  ethereumToolkit: ethers.providers.Provider;
  userAddress: string
}


function ConnectedWrapContainer(props: ConnectedWrapContainerProps) {
  const nonFungibleTokens = useNonFungibleTokens();
  const [selectedToken, setSelectedToken] = useState(nonFungibleTokens[Object.keys(nonFungibleTokens)[0]]);
  const [pagination, setPagination] = useState({currentPage: 1, limitPerPage: 4});
  const userTokens = useClientNtfBalance({
    address: props.userAddress,
    nftAddress: selectedToken.ethereumContractAddress,
    ethereumToolkit: props.ethereumToolkit,
    ...pagination
  });



  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setPagination({...pagination, currentPage: value})
  };



  return <>
    <Container>
      <HalfCard>

        <CardContent>
          <EthereumTokenSelection
            onTokenChange={(tokenId) => {
              setSelectedToken(nonFungibleTokens[tokenId]);
            }}
            token={selectedToken}
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

    {/*<Button onClick={nextPage}>*/}
    {/*  Next {userTokens.totalTokens}*/}
    {/*</Button>*/}
  </>;
}

export const WrapContainer = () => {
  const { state: tzState } = useTezosWalletContext();
  const { state: ethState } = useEthereumWalletContext();


  const [connected, setConnected] = useState(false);


  useEffect(() => {
    setConnected(
      tzState.type === TezosStateType.CONNECTED &&
      ethState.type === EthereumStateType.CONNECTED
    );
  }, [tzState, ethState]);

  return (
    <>
      {!connected && <Container sx={{ paddingBottom: 3 }}>

        <HalfCard>
          <CardContent>
            <MultiConnect />
          </CardContent>
        </HalfCard>

      </Container>}
      {ethState.type === EthereumStateType.CONNECTED && <ConnectedWrapContainer
        ethereumToolkit={ethState.ethereumToolkit}
        userAddress={ethState.ethereumAccount}
      />}

    </>
  );
}
;
