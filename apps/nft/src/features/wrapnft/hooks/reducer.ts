import { Action, EthereumNftWrapApi, EthereumNftWrapApiBuilder, EthereumNftWrapApiFactory } from '@wrap-dapps/features';
import { isType } from 'typescript-fsa';
import {
  nftApproved,
  nftNetworkFees,
  nftWrapDone,
  runNftAllowance,
  runNftWrap,
  selectNft, setContract,
  toggleNftAgreement,
  walletChange
} from './actions';
import BigNumber from 'bignumber.js';
import { NonFungibleToken } from '@wrap-dapps/api';
import { NftInstance } from '../../nft/api/types';

type NftWrapState = {
  status: NftWrapStatus;
  contract: EthereumNftWrapApi | null;
  connected: boolean;
  contractFactory?: EthereumNftWrapApiFactory;
  custodianContractAddress: string;
  networkFees: BigNumber;
  nftCollection: NonFungibleToken | null;
  nftInstance: NftInstance | null;
  isAllowed: boolean;
};

export enum NftWrapStatus {
  NOT_READY,
  READY_TO_CONFIRM,
  WAITING_FOR_ALLOWANCE_APPROVAL,
  READY_TO_WRAP,
  AGREEMENT_CONFIRMED,
  WAITING_FOR_WRAP
}

export function initialState(custodianContractAddress: string): NftWrapState {
  return {
    status: NftWrapStatus.NOT_READY,
    contract: null,
    connected: false,
    custodianContractAddress,
    networkFees: new BigNumber(''),
    isAllowed: false,
    nftCollection: null,
    nftInstance: null
  };
}

const agree = (state: NftWrapState): NftWrapState => {
  if (!state.connected) {
    return { ...state, status: NftWrapStatus.NOT_READY };
  }
  const newStatus = state.isAllowed
    ? NftWrapStatus.READY_TO_WRAP
    : NftWrapStatus.AGREEMENT_CONFIRMED;

  return { ...state, status: newStatus };
};

export function reducer(state: NftWrapState, action: Action): NftWrapState {
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
  if (isType(action, runNftAllowance)) {
    return {
      ...state,
      status: NftWrapStatus.WAITING_FOR_ALLOWANCE_APPROVAL
    };
  }
  if (isType(action, nftApproved)) {
    return {
      ...state,
      isAllowed: true,
      status: NftWrapStatus.READY_TO_WRAP
    };
  }
  if (isType(action, runNftWrap)) {
    return {
      ...state,
      status: NftWrapStatus.WAITING_FOR_WRAP
    };
  }
  if (isType(action, nftNetworkFees)) {
    return {
      ...state,
      networkFees: action.payload.networkFees
    };
  }
  if (isType(action, nftWrapDone)) {
    return {
      ...state,
      status: NftWrapStatus.READY_TO_WRAP
    };
  }
  if (isType(action, toggleNftAgreement)) {
    return action.payload ? agree(state) : { ...state, status: NftWrapStatus.READY_TO_CONFIRM };
  }
  if (isType(action, walletChange)) {
    const { ethAccount, tezosAccount, ethLibrary } = action.payload;
    const ethWrapApiFactory =
      tezosAccount && ethAccount && ethLibrary
        ? EthereumNftWrapApiBuilder.withProvider(ethLibrary)
          .forCustodianContract(state.custodianContractAddress)
          .forAccount(ethAccount, tezosAccount)
          .createFactory()
        : undefined;
    return {
      ...state,
      contractFactory: ethWrapApiFactory,
      status: ethWrapApiFactory ? state.status : NftWrapStatus.NOT_READY,
      connected: ethAccount !== undefined && tezosAccount !== undefined
    };
  }

  return state;
}
