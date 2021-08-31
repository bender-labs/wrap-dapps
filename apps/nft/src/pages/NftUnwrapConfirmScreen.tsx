import { useHistory, useParams } from 'react-router-dom';
import React, { useEffect, useMemo, useState } from 'react';
import { useEthereumWalletContext, usePendingOperationsActions } from '@wrap-dapps/features';
import { createEthereumNftApi } from '../features/nft/api/EthereumNftApi';
import { nftUnwrapOperationPage, paths } from './routes';
import { NftUnwrapConfirmStep } from '../features/unwrapnft/components/NftUnwrapConfirmStep';
import { useNftUnwrap } from '../features/unwrapnft/hooks/useNftUnwrap';

type NftUnwrapConfirmState = {
  loading: boolean;
};

export function NftUnwrapConfirmScreen() {
  const { nftCollectionAddress, tokenId } = useParams() as { nftCollectionAddress: string; tokenId: string };
  const [nftUnwrapConfirmState, setNftUnwrapConfirmState] = useState<NftUnwrapConfirmState>({
    loading: true
  });
  const { ethereumLibrary } = useEthereumWalletContext();
  const nftApi = useMemo(() => createEthereumNftApi(ethereumLibrary()!), [ethereumLibrary]);
  const history = useHistory();

  const {
    setNft,
    fees,
    launchNftUnwrap,
    tezosAccount,
    ethereumAccount,
    agree,
    status,
    nftInstance,
    networkFees,
    nonFungibleTokens
  } = useNftUnwrap();
  const { addOperation } = usePendingOperationsActions();

  const doLaunchNftUnwrap = async () => {
    const op = await launchNftUnwrap();
    if (!op) {
      return;
    }
    await addOperation(op);
    history.push(nftUnwrapOperationPage(op));
    return op;
  };

  //todo : check owner of tokenId, controle valeur tokenId
  useEffect(() => {
    const loadToken = async () => {
      const nftCollection = Object.values(nonFungibleTokens).find((availableToken) => (availableToken.ethereumContractAddress === nftCollectionAddress)) ?? null;
      const nftInstance = nftCollection && tokenId ? await nftApi.fetchNftTokenMetadata(nftCollection, tokenId) : null;
      setNft(nftCollection, nftInstance);
      setNftUnwrapConfirmState({
        loading: false
      });
    };
    loadToken();
  }, [nftApi, nftCollectionAddress, tokenId]);

  useEffect(() => {
    if (!nftUnwrapConfirmState.loading && !nftInstance) {
      history.push(paths.TEZOS_DASHBOARD);
    }
  }, [nftUnwrapConfirmState]);

  return (
    <NftUnwrapConfirmStep fees={fees}
                          sendingAddress={tezosAccount()!}
                          recipientAddress={ethereumAccount()!}
                          onPrevious={() => {
                            history.push(paths.TEZOS_DASHBOARD);
                          }}
                          networkFees={networkFees}
                          status={status}
                          onWrap={doLaunchNftUnwrap}
                          onAgreementChange={agree}
                          nftInstance={nftInstance}
    />
  );
}