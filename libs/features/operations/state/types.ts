import BigNumber from 'bignumber.js';

export enum OperationType {
  WRAP,
  UNWRAP,
  WRAP_NFT,
  UNWRAP_NFT
}

export enum OperationStatusType {
  WAITING_FOR_RECEIPT = 'WAITING_FOR_RECEIPT',
  NEW = 'NEW',
  WAITING_FOR_CONFIRMATIONS = 'WAITING_CONFIRMATIONS',
  WAITING_FOR_SIGNATURES = 'WAITING_SIGNATURES',
  READY = 'READY',
  DONE = 'DONE',
}

export interface WaitingForReceipt {
  type: OperationStatusType.WAITING_FOR_RECEIPT;
}

export interface New {
  type: OperationStatusType.NEW;
}

export interface WaitingForConfirmations {
  type: OperationStatusType.WAITING_FOR_CONFIRMATIONS;
  id: string;
  confirmations: number;
  confirmationsThreshold: number;
}

export interface WaitingForSignatures {
  type: OperationStatusType.WAITING_FOR_SIGNATURES;
  id: string;
  signatures: Record<string, string>;
}

export interface Ready {
  type: OperationStatusType.READY;
  id: string;
  signatures: Record<string, string>;
}

export interface Done {
  type: OperationStatusType.DONE;
  id: string;
}

export type OperationStatus =
  | WaitingForReceipt
  | New
  | WaitingForConfirmations
  | WaitingForSignatures
  | Ready
  | Done;

export interface BaseOperation {
  type: OperationType;
  status: OperationStatus;
  hash: string;
  source: string;
  destination: string;
  token: string;
  fees: BigNumber;
}

export interface ERC20Operation extends BaseOperation {
  amount: BigNumber;
}

export interface WrapErc20Operation extends ERC20Operation {
  type: OperationType.WRAP;
  transactionHash: string;
}

export interface UnwrapErc20Operation extends ERC20Operation {
  type: OperationType.UNWRAP;
  operationHash: string;
}

export interface ERC721Operation extends BaseOperation {
  tokenId: string;
}

export interface WrapERC721Operation extends ERC721Operation {
  type: OperationType.WRAP_NFT;
}

export interface UnwrapERC721Operation extends ERC721Operation {
  type: OperationType.UNWRAP_NFT;
}

export type Operation = WrapErc20Operation | UnwrapErc20Operation | WrapERC721Operation | UnwrapERC721Operation;
