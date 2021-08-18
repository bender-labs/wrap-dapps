export interface WrapConfiguration {
  ethereumNetwork: string;
  ethereumNetworkId: number;
  tezosNetwork: string;
  ethereumWrapContract: string;
  tezosMinterContract: string;
  tezosQuorumContract: string;
  wrapRequiredSignatures: number;
  unwrapRequiredSignatures: number;
  tokens: Token[];
  fees: Fees;
}

export type Token = FungibleToken | NonFungibleToken;

export enum TokenType {
  ERC20 = 'ERC20',
  ERC721 = 'ERC721',
}

export interface FungibleToken extends BaseToken {
  type: TokenType.ERC20;
  decimals: number;
  tezosTokenId: number;
}

export interface NonFungibleToken extends BaseToken {
  type: TokenType.ERC721;
}

export interface BaseToken {
  type: TokenType;
  ethereumSymbol: string;
  ethereumName: string;
  ethereumContractAddress: string;
  tezosWrappingContract: string;
  tezosSymbol: string;
  tezosName: string;
  thumbnailUri?: string;
}

export interface Fees {
  erc20WrappingFees: number;
  erc20UnwrappingFees: number;
  erc721WrappingFees: number;
  erc721UnwrappingFees: number;
}

export const EmptyToken: Token = {
  type: TokenType.ERC20,
  ethereumSymbol: '',
  tezosWrappingContract: '',
  ethereumName: '',
  ethereumContractAddress: '',
  decimals: 0,
  tezosTokenId: 0,
  tezosName: '',
  tezosSymbol: '',
  thumbnailUri: ''
};

export interface IndexerTokenPayload {
  id: string;
  source: string;
  destination: string;
  token: string;
  transactionHash?: string;
  operationHash?: string;
  signatures: Record<string, string>;
  confirmations: number;
  confirmationsThreshold: number;
  amount?: string;
  tokenId: string;
  status: 'asked' | 'finalized' | 'reverted';
}

export interface IndexerWrapPayload {
  result: Array<IndexerTokenPayload>;
}

export interface IndexerUnwrapPayload {
  result: Array<IndexerTokenPayload>;
}