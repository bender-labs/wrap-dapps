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

export interface Token {
  type: 'ERC20' | 'ERC721';
  ethereumSymbol: string;
  ethereumName: string;
  ethereumContractAddress: string;
  decimals: string;
  tezosWrappingContract: string;
  tezosTokenId?: string;
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

export interface IndexerApi {
  getConfiguration(): Promise<WrapConfiguration>;
}
