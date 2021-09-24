import { useParams } from 'react-router-dom';
import React, { useEffect, useMemo, useState } from 'react';
import {
  TezosNftTransferApi,
  TezosNftTransferApiBuilder,
  useEthereumWalletContext,
  useTezosWalletContext
} from '@wrap-dapps/features';
import { createEthereumNftApi } from '../../features/nft/api/EthereumNftApi';
import {
  LabelAndAsset,
  LabelAndValue,
  PaperActions,
  PaperContent,
  PaperHeader,
  PaperNav,
  PaperTitle,
  TezosAddressInput,
  useConfig
} from '@wrap-dapps/components';
import { Box, CardMedia, Container, IconButton, styled, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { NftTransferAction } from '../../features/unwrap_nft/components/NftTransferAction';
import { NftInstance } from '../../features/nft/api/types';
import BigNumber from 'bignumber.js';
import { useHistory } from 'react-router';
import { paths } from '../routes';

const Description = styled(Typography)(() => ({
  paddingLeft: '20px',
  fontWeight: 'bold'
}));

interface NftTezosTransferScreenState {
  loading: boolean;
  nftInstance: NftInstance | null;
  tezosRecipientAddress: string;
  tezosNftTransferApi: TezosNftTransferApi | null;
  ready: boolean;
  networkFees: BigNumber;
}

export function NftTezosTransferScreen() {
  const { nftCollectionAddress, tokenId } = useParams() as { nftCollectionAddress: string; tokenId: string };
  const { ethereumLibrary } = useEthereumWalletContext();
  const { tezosAccount, tezosLibrary } = useTezosWalletContext();
  const { indexerUrl } = useConfig();
  const nftApi = useMemo(() => createEthereumNftApi(ethereumLibrary()!), [ethereumLibrary]);
  const [state, setState] = useState<NftTezosTransferScreenState>({
    loading: true,
    nftInstance: null,
    tezosRecipientAddress: '',
    tezosNftTransferApi: null,
    ready: false,
    networkFees: new BigNumber(0)
  });
  const { nonFungibleTokens } = useConfig();
  const history = useHistory();

  useEffect(() => {
    const loadNft = async () => {
      const nftCollection = Object.values(nonFungibleTokens).find((availableToken) => (availableToken.ethereumContractAddress === nftCollectionAddress)) ?? null;
      const nftInstance = nftCollection && tokenId ? await nftApi.fetchNftTokenMetadata(nftCollection, tokenId, indexerUrl) : null;
      setState({ ...state, loading: false, nftInstance: nftInstance });
    };
    loadNft();
  }, [nftApi, nftCollectionAddress, tokenId]);

  useEffect(() => {
    if (tezosLibrary() && tezosAccount() && state.nftInstance) {
      const tezosNftTransferApiFactory = new TezosNftTransferApiBuilder(tezosLibrary()!).forAccount(tezosAccount()!).createFactory();
      const tezosNftTransferApi = tezosNftTransferApiFactory.forErc721(state.nftInstance.nftCollection.tezosWrappingContract, state.nftInstance.id);
      setState({ ...state, tezosNftTransferApi: tezosNftTransferApi });
    }
  }, [tezosLibrary, tezosAccount, state.nftInstance]);

  useEffect(() => {
    if (state.tezosNftTransferApi && state.tezosRecipientAddress) {
      setState({ ...state, ready: true });
    } else {
      setState({ ...state, ready: false });
    }
  }, [state.tezosNftTransferApi, state.tezosRecipientAddress]);

  useEffect(() => {
    const estimateNetworkFees = async () => {
      const networkFees = await state.tezosNftTransferApi?.estimateTransferNft(state.tezosRecipientAddress);
      setState({ ...state, networkFees: new BigNumber(networkFees!.totalCost) });
    };

    if (state.ready) {
      estimateNetworkFees();
    }
  }, [state.ready]);

  const onPrevious = () => {
    history.push(paths.UNWRAP_NFT);
  };

  const transferNFT = () => {
    state.tezosNftTransferApi?.transferNft(state.tezosRecipientAddress);
  };

  const onRecipientChange = (tezosRecipientAddress: string) => {
    setState({ ...state, tezosRecipientAddress });
  };

  return (
    <Container maxWidth='xs'>
      <PaperHeader>
        <PaperNav>
          <IconButton onClick={onPrevious}>
            <ArrowBackIcon />
          </IconButton>
        </PaperNav>
        <PaperTitle>NFT Tezos transfer</PaperTitle>
        <PaperActions />
      </PaperHeader>
      <PaperContent>
        {state.nftInstance &&
        <CardMedia sx={{
          height: 0,
          backgroundSize: 'contain',
          paddingTop: '100%'
        }} image={state.nftInstance.thumbnailUri} title={state.nftInstance.name}
        />}
        <LabelAndValue label={'Collection'} value={state.nftInstance?.nftCollection.ethereumName} />
        <LabelAndValue label={'Name'} value={state.nftInstance?.name} />
        <LabelAndValue label={'From'} value={tezosAccount()} />
        <Box sx={{ padding: 2 }}>
          <TezosAddressInput onRecipientChange={onRecipientChange} />
        </Box>
      </PaperContent>
      <PaperContent alternate={true}>
        <Description variant={'body2'}>
          Fees
        </Description>
        <LabelAndAsset
          label={'Network fees (est.)'}
          decimals={6}
          value={state.networkFees}
          symbol={'XTZ'}
          emptyState={state.networkFees.isNaN() || state.networkFees.lte(0)}
          emptyStatePlaceHolder={'Awaiting recipient address'}
        />
      </PaperContent>
      <NftTransferAction onTransfer={transferNFT} loading={state.loading} ready={state.ready} />
    </Container>
  );
}