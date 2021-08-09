import React, { useEffect, useState } from 'react';
import { CardContent, Container } from '@material-ui/core';
import Stack from '@material-ui/core/Stack';
import Pagination from '@material-ui/core/Pagination';
import {
  EthereumConnected,
  EthereumStateType,
  HalfCard,
  MultiConnect,
  TezosStateType,
  useEthereumWalletContext,
  useNonFungibleTokens,
  useTezosWalletContext
} from '@wrap-dapps/components';
import Gallery from '../feature/nft/Gallery';
import { useClientNtfBalance } from '../feature/nft/hook/useClientNtfBalance';
import { SupportedBlockchain } from '@wrap-dapps/components/wallet/blockchain';
import TokenSelection from '../components/token/TokenSelection';

type ConnectedWrapContainerProps = {
  ethState: EthereumConnected
}

function ConnectedNftWrapSelectorScreen(props: ConnectedWrapContainerProps) {
  const nonFungibleTokens = useNonFungibleTokens();
  const [selectedToken, setSelectedToken] = useState(nonFungibleTokens[Object.keys(nonFungibleTokens)[0]]);
  const [pagination, setPagination] = useState({ currentPage: 1, limitPerPage: 4 });
  const userTokens = useClientNtfBalance({
    address: props.ethState.ethereumAccount,
    nftAddress: selectedToken.ethereumContractAddress,
    ethereumToolkit: props.ethState.ethereumToolkit,
    ...pagination
  });

  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setPagination({ ...pagination, currentPage: value });
  };

  return <>
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
  </>;
}

export const NftWrapSelectorScreen = () => {
  const { state: tzState } = useTezosWalletContext();
  const { state: ethState } = useEthereumWalletContext();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    setConnected(
      tzState.type === TezosStateType.CONNECTED &&
      ethState.type === EthereumStateType.CONNECTED
    );
  }, [tzState, ethState]);

  if (connected) {
    return <ConnectedNftWrapSelectorScreen ethState={ethState as EthereumConnected} />;
  } else {
    return (
      <Container sx={{ paddingBottom: 3 }}>
        <HalfCard>
          <CardContent>
            <MultiConnect />
          </CardContent>
        </HalfCard>
      </Container>
    );
  }
};