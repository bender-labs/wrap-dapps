export interface NftInstanceAttribute {
  key: string;
  value: string;
}

export interface NftInstance {
  id: string;
  thumbnailUri: string;
  name: string;
  attributes: NftInstanceAttribute[];
}

export interface NftPage {
  collection: string;
  results: NftInstance[];
}

export interface NftApi {
  fetchUserNftInstances(
    collection: string,
    address: string,
    cursor?: string
  ): Promise<NftPage>;
}
