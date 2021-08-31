import { useCallback, useEffect, useReducer } from 'react';
import { NotificationLevel, useConfig, useNotify } from '@wrap-dapps/components';
import {
  Operation,
  OperationStatusType,
  OperationType,
  unwrapERC721Fees,
  useEthereumWalletContext,
  useTezosWalletContext
} from '@wrap-dapps/features';
import {
  nftNetworkFees,
  nftUnwrapDone,
  runNftUnwrap,
  selectNft,
  setContract,
  toggleNftAgreement,
  walletChange
} from './actions';
import { initialState, NftUnwrapStatus, reducer } from './reducer';
import { NonFungibleToken } from '@wrap-dapps/api';
import { NftInstance } from '../../nft/api/types';
import BigNumber from 'bignumber.js';

export function useNftUnwrap() {
  const notify = useNotify();

  const {
    nonFungibleTokens,
    fees,
    tezos: { minterContractAddress }
  } = useConfig();

  const { ethereumAccount, ethereumLibrary } = useEthereumWalletContext();
  const { tezosAccount, tezosLibrary } = useTezosWalletContext();

  const [state, dispatch] = useReducer<typeof reducer>(reducer, initialState(minterContractAddress, fees));

  useEffect(() => {
    dispatch(
      walletChange({
        ethLibrary: ethereumLibrary(),
        ethAccount: ethereumAccount(),
        tezosAccount: tezosAccount(),
        tezosLibrary: tezosLibrary()
      })
    );
  }, [tezosLibrary, tezosAccount, ethereumLibrary, ethereumAccount]);

  const setNft = useCallback((nftCollection: NonFungibleToken | null, nftInstance: NftInstance | null) => {
    dispatch(selectNft({ nftCollection, nftInstance }));
  }, []);

  const launchNftUnwrap = () => {
    const { contract } = state;
    if (contract == null) return Promise.reject('Not ready');

    const startUnwrapping = async () => {
      try {
        const transactionHash = await contract.unwrapNft(unwrapERC721Fees(fees));
        const op: Operation = {
          hash: transactionHash,
          source: ethereumAccount()!,
          destination: tezosAccount()!,
          status: { type: OperationStatusType.NEW },
          type: OperationType.UNWRAP_NFT,
          token: state.nftCollection!.ethereumContractAddress,
          fees: unwrapERC721Fees(fees),
          tokenId: state.nftInstance!.id
        };

        return op;
      } catch (e) {
        notify(NotificationLevel.ERROR, 'Error while calling unwrap');
      }
      dispatch(nftUnwrapDone());
    };
    dispatch(runNftUnwrap());
    return startUnwrapping();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const agree = (v: boolean) => dispatch(toggleNftAgreement(v));

  useEffect(() => {
    const computeNetworkFees = async () => {
      const { status, contract } = state;
      if (
        status !== NftUnwrapStatus.READY_TO_UNWRAP ||
        contract == null ||
        ethereumLibrary() === undefined
      ) {
        return;
      }
      const estimation = await contract.estimateUnwrapNetworkFees(unwrapERC721Fees(fees));
      dispatch(nftNetworkFees({ networkFees: new BigNumber(estimation.totalCost ?? 0) }));
    };

    let tryNumber = 0;
    try {
      // noinspection JSIgnoredPromiseFromCall
      computeNetworkFees();
    } catch (e) {
      if (tryNumber === 1) {
        setTimeout(computeNetworkFees, 1000);
        tryNumber++;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.status]);

  useEffect(() => {
    const loadMetadata = async () => {
      if (!state.nftInstance || !state.contractFactory) {
        return;
      }
      const contract = state.contractFactory.forErc721(
        state.nftInstance.nftCollection.ethereumContractAddress,
        state.nftInstance.nftCollection.tezosWrappingContract,
        state.nftInstance.id
      );
      dispatch(setContract({ contract }));
    };
    loadMetadata();
    // eslint-disable-next-line
  }, [state.nftInstance, state.contractFactory]);

  return {
    ...state,
    fees,
    nonFungibleTokens,
    setNft,
    tezosAccount,
    ethereumAccount,
    agree,
    launchNftUnwrap
  };
}
