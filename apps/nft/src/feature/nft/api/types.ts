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

export interface NftApi {
  fetchUserNftInstances(
    collection: string,
    address: string,
    cursor?: Cursor
  ): Promise<NftPage>;
}
