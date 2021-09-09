import { NonFungibleToken } from '@wrap-dapps/api';

export interface NftInstanceAttribute {
  key: string;
  value: string;
}

export interface NftInstance {
  id: string;
  thumbnailUri: string;
  name: string;
  description: string;
  attributes: NftInstanceAttribute[];
  nftCollection: NonFungibleToken;
}

export interface NftPage {
  collection: string;
  results: NftInstance[];
  total: number;
}

export interface Cursor {
  limit: number;
  offset: number;
}

export interface EthereumNftApi {
  fetchNftTokensWithMetadata(nftCollection: NonFungibleToken, address: string, indexerUrl: string, cursor?: Cursor): Promise<NftPage>;

  fetchNftTokenMetadata(nftCollection: NonFungibleToken, tokenId: string, indexerUrl: string): Promise<NftInstance>;
}
