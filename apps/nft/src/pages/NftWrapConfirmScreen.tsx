import { useHistory, useParams } from 'react-router-dom';
import React, { useEffect, useMemo, useState } from 'react';
import { useEthereumWalletContext, usePendingOperationsActions } from '@wrap-dapps/features';
import { createNftApi } from '../features/nft/api/NftApi';
import { nftOperationPage, paths } from './routes';
import { useNftWrap } from '../features/wrapnft/hooks/useNftWrap';
import { NftWrapConfirmStep } from '../features/wrapnft/components/NftWrapConfirmStep';

type NftWrapConfirmState = {
  loading: boolean;
};

export function NftWrapConfirmScreen() {
  const { nftCollectionAddress, tokenId } = useParams() as { nftCollectionAddress: string; tokenId: string };
  const [nftWrapConfirmState, setNftWrapConfirmState] = useState<NftWrapConfirmState>({
    loading: true
  });
  const { ethereumLibrary } = useEthereumWalletContext();
  const nftApi = useMemo(() => createNftApi(ethereumLibrary()!), [ethereumLibrary]);
  const history = useHistory();

  const {
    setNft,
    fees,
    launchNftWrap,
    tezosAccount,
    ethereumAccount,
    agree,
    launchNftAllowanceApproval,
    isAllowed,
    status,
    nftInstance,
    networkFees,
    nonFungibleTokens
  } = useNftWrap();
  const { addOperation } = usePendingOperationsActions();

  const doLaunchNftWrap = async () => {
    const op = await launchNftWrap();
    if (!op) {
      return;
    }
    await addOperation(op);
    history.push(nftOperationPage(op));
    return op;
  };

  //todo : check owner of tokenId, controle valeur tokenId
  useEffect(() => {
    const loadToken = async () => {
      const nftCollection = Object.values(nonFungibleTokens).find((availableToken) => (availableToken.ethereumContractAddress === nftCollectionAddress)) ?? null;
      const nftInstance = nftCollection && tokenId ? await nftApi.fetchUserNftToken(nftCollection, tokenId) : null;
      setNft(nftCollection, nftInstance);
      setNftWrapConfirmState({
        loading: false
      });
    };
    loadToken();
  }, [nftApi, nftCollectionAddress, tokenId]);

  useEffect(() => {
    if (!nftWrapConfirmState.loading && !nftInstance) {
      history.push(paths.ETHEREUM_DASHBOARD);
    }
  }, [nftWrapConfirmState]);

  return (
    <NftWrapConfirmStep fees={fees}
                        sendingAddress={ethereumAccount()!}
                        recipientAddress={tezosAccount()!}
                        onPrevious={() => {
                          history.push(paths.ETHEREUM_DASHBOARD);
                        }}
                        networkFees={networkFees}
                        status={status}
                        isAllowed={isAllowed}
                        onAuthorize={launchNftAllowanceApproval}
                        onWrap={doLaunchNftWrap}
                        onAgreementChange={agree}
                        nftInstance={nftInstance}
    />
  );
}