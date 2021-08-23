import { useCallback, useEffect, useReducer } from 'react';
import { NotificationLevel, useConfig, useNotify } from '@wrap-dapps/components';
import {
  Operation,
  OperationStatusType,
  OperationType,
  useEthereumWalletContext,
  useTezosWalletContext,
  wrapERC721Fees
} from '@wrap-dapps/features';
import {
  nftApproved,
  nftNetworkFees,
  nftWrapDone,
  runNftAllowance,
  runNftWrap,
  selectNft,
  setContract,
  toggleNftAgreement,
  walletChange
} from './actions';
import { initialState, NftWrapStatus, reducer } from './reducer';
import { NonFungibleToken } from '@wrap-dapps/api';
import { NftInstance } from '../../nft/api/types';

export function useNftWrap() {
  const notify = useNotify();

  const {
    nonFungibleTokens,
    fees,
    ethereum: { custodianContractAddress }
  } = useConfig();

  const { ethereumAccount, ethereumLibrary } = useEthereumWalletContext();
  const { tezosAccount, tezosLibrary } = useTezosWalletContext();

  const [state, dispatch] = useReducer<typeof reducer>(reducer, initialState(custodianContractAddress));

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

  const launchNftAllowanceApproval = useCallback(() => {
    const startNftAllowanceProcess = async () => {
      const { contract, isAllowed } = state;
      if (isAllowed) return;
      if (contract == null) return;
      await contract.approve(state.nftInstance!.id);
      dispatch(runNftAllowance());
      let counter = 0;
      const refreshCurrentAllowance = () =>
        setTimeout(async () => {
          counter++;
          const isApproved = await contract.isApproved(state.nftInstance!.id);
          if (isApproved) {
            dispatch(nftApproved());
            return;
          } else {
            if (counter > 1000) throw new Error('Timeout');
            refreshCurrentAllowance();
          }
        }, 2000);
      refreshCurrentAllowance();
    };

    return startNftAllowanceProcess();
  }, [state]);

  const launchNftWrap = () => {
    const { contract } = state;
    if (contract == null) return Promise.reject('Not ready');

    const startWrapping = async () => {
      try {
        const transactionHash = await contract.wrapNft(state.nftInstance!.id);
        const op: Operation = {
          hash: transactionHash,
          source: ethereumAccount()!,
          destination: tezosAccount()!,
          status: { type: OperationStatusType.WAITING_FOR_RECEIPT },
          type: OperationType.WRAP_NFT,
          token: state.nftCollection!.ethereumContractAddress,
          fees: wrapERC721Fees(fees),
          tokenId: state.nftInstance!.id
        };

        return op;
      } catch (e) {
        notify(NotificationLevel.ERROR, 'Error while calling wrap');
      }
      dispatch(nftWrapDone());
    };
    dispatch(runNftWrap());
    return startWrapping();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const agree = (v: boolean) => dispatch(toggleNftAgreement(v));

  useEffect(() => {
    const computeNetworkFees = async () => {
      const { status, contract } = state;
      if (
        status !== NftWrapStatus.READY_TO_WRAP ||
        contract == null ||
        ethereumLibrary() === undefined
      ) {
        return;
      }
      const estimation = await contract.networkFees(ethereumLibrary()!, state.nftInstance!.id);
      dispatch(nftNetworkFees({ networkFees: estimation }));
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
        state.nftInstance.nftCollection.ethereumContractAddress
      );
      dispatch(setContract({ contract }));
      const currentAllowedAddress = await contract.getCurrentApprovedAddress(state.nftInstance.id);
      if (currentAllowedAddress === custodianContractAddress) {
        dispatch(nftApproved);
      }
    };
    loadMetadata();
    // eslint-disable-next-line
  }, [state.nftInstance, state.contractFactory]);

  return {
    ...state,
    fees,
    nonFungibleTokens,
    setNft,
    launchNftAllowanceApproval,
    tezosAccount,
    ethereumAccount,
    agree,
    launchNftWrap
  };
}
