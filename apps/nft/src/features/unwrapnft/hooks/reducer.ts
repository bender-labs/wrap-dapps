import { Action, TezosNftUnwrapApi, TezosNftUnwrapApiBuilder, TezosNftUnwrapApiFactory } from '@wrap-dapps/features';
import { isType } from 'typescript-fsa';
import {
  nftNetworkFees,
  nftUnwrapDone,
  runNftUnwrap,
  selectNft,
  setContract,
  toggleNftAgreement,
  walletChange
} from './actions';
import BigNumber from 'bignumber.js';
import { Fees, NonFungibleToken } from '@wrap-dapps/api';
import { NftInstance } from '../../nft/api/types';

type NftUnwrapState = {
  status: NftUnwrapStatus;
  contract: TezosNftUnwrapApi | null;
  connected: boolean;
  contractFactory?: TezosNftUnwrapApiFactory;
  minterContractAddress: string;
  networkFees: BigNumber;
  nftCollection: NonFungibleToken | null;
  nftInstance: NftInstance | null;
  fees: Fees;
};

export enum NftUnwrapStatus {
  NOT_READY,
  READY_TO_CONFIRM,
  READY_TO_UNWRAP,
  AGREEMENT_CONFIRMED,
  WAITING_FOR_UNWRAP,
  UNWRAP_DONE
}

export function initialState(minterContractAddress: string, fees: Fees): NftUnwrapState {
  return {
    status: NftUnwrapStatus.NOT_READY,
    contract: null,
    connected: false,
    minterContractAddress,
    networkFees: new BigNumber(''),
    nftCollection: null,
    nftInstance: null,
    fees: fees
  };
}

const agree = (state: NftUnwrapState): NftUnwrapState => {
  if (!state.connected) {
    return { ...state, status: NftUnwrapStatus.NOT_READY };
  }
  return { ...state, status: NftUnwrapStatus.READY_TO_UNWRAP };
};

export function reducer(state: NftUnwrapState, action: Action): NftUnwrapState {
  if (isType(action, setContract)) {
    return {
      ...state,
      contract: action.payload.contract
    };
  }
  if (isType(action, selectNft)) {
    return {
      ...state,
      nftCollection: action.payload.nftCollection,
      nftInstance: action.payload.nftInstance
    };
  }
  if (isType(action, runNftUnwrap)) {
    return {
      ...state,
      status: NftUnwrapStatus.WAITING_FOR_UNWRAP
    };
  }
  if (isType(action, nftNetworkFees)) {
    return {
      ...state,
      networkFees: action.payload.networkFees
    };
  }
  if (isType(action, nftUnwrapDone)) {
    return {
      ...state,
      status: NftUnwrapStatus.UNWRAP_DONE
    };
  }
  if (isType(action, toggleNftAgreement)) {
    return action.payload ? agree(state) : { ...state, status: NftUnwrapStatus.READY_TO_CONFIRM };
  }
  if (isType(action, walletChange)) {
    const { ethAccount, tezosAccount, tezosLibrary } = action.payload;
    const contractFactory =
      ethAccount && tezosAccount && tezosLibrary
        ? TezosNftUnwrapApiBuilder.withProvider(tezosLibrary)
          .forAccount(ethAccount, tezosAccount)
          .forMinterContract(state.minterContractAddress)
          .forFees(state.fees)
          .createFactory()
        : undefined;
    return {
      ...state,
      contractFactory: contractFactory,
      status: contractFactory ? state.status : NftUnwrapStatus.NOT_READY,
      connected: ethAccount !== undefined && tezosAccount !== undefined
    };
  }

  return state;
}
