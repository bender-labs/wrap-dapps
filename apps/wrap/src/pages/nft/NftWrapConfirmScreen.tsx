import { useHistory, useParams } from 'react-router-dom';
import React, { useEffect, useMemo, useState } from 'react';
import { useEthereumWalletContext, usePendingOperationsActions } from '@wrap-dapps/features';
import { createEthereumNftApi } from '../../features/nft/api/EthereumNftApi';
import { nftWrapOperationPage, paths } from '../routes';
import { useNftWrap } from '../../features/wrapnft/hooks/useNftWrap';
import { NftWrapConfirmStep } from '../../features/wrapnft/components/NftWrapConfirmStep';
import { useConfig } from '@wrap-dapps/components';

type NftWrapConfirmState = {
  loading: boolean;
};

export function NftWrapConfirmScreen() {
  const { nftCollectionAddress, tokenId } = useParams() as { nftCollectionAddress: string; tokenId: string };
  const [nftWrapConfirmState, setNftWrapConfirmState] = useState<NftWrapConfirmState>({
    loading: true
  });
  const { ethereumLibrary } = useEthereumWalletContext();
  const { indexerUrl } = useConfig();
  const nftApi = useMemo(() => createEthereumNftApi(ethereumLibrary()!), [ethereumLibrary]);
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
    history.push(nftWrapOperationPage(op));
    return op;
  };

  //todo : check owner of tokenId, controle valeur tokenId
  useEffect(() => {
    const loadToken = async () => {
      const nftCollection = Object.values(nonFungibleTokens).find((availableToken) => (availableToken.ethereumContractAddress === nftCollectionAddress)) ?? null;
      const nftInstance = nftCollection && tokenId ? await nftApi.fetchNftTokenMetadata(nftCollection, tokenId, indexerUrl) : null;
      setNft(nftCollection, nftInstance);
      setNftWrapConfirmState({
        loading: false
      });
    };
    loadToken();
  }, [nftApi, nftCollectionAddress, tokenId]);

  useEffect(() => {
    if (!nftWrapConfirmState.loading && !nftInstance) {
      history.push(paths.WRAP_NFT);
    }
  }, [nftWrapConfirmState]);

  return (
    <NftWrapConfirmStep fees={fees}
                        sendingAddress={ethereumAccount()!}
                        recipientAddress={tezosAccount()!}
                        onPrevious={() => {
                          history.push(paths.WRAP_NFT);
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