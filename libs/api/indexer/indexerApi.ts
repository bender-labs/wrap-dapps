import { IndexerUnwrapPayload, IndexerWrapPayload, WrapConfiguration } from './types';
import axios, { AxiosInstance } from 'axios';
import { EthereumAddress, TezosAddress } from '@wrap-dapps/features/ethereum/EthereumWrapApi';

export class IndexerApi {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({ baseURL, timeout: 3000 });
  }

  public getConfiguration(_: void): Promise<WrapConfiguration> {
    return this.client.get('/configuration').then(({ data }) => data);
  }

  public fetchPendingWraps(
    ethereumAddress?: EthereumAddress,
    tezosAddress?: TezosAddress
  ): Promise<IndexerWrapPayload> {
    return this.fetchWraps('asked', ethereumAddress, tezosAddress);
  }

  public fetchFinalizedWraps(
    ethereumAddress?: EthereumAddress,
    tezosAddress?: TezosAddress
  ): Promise<IndexerWrapPayload> {
    return this.fetchWraps('finalized', ethereumAddress, tezosAddress);
  }

  private fetchWraps(
    status: string,
    ethereumAddress?: EthereumAddress,
    tezosAddress?: TezosAddress
  ): Promise<IndexerWrapPayload> {
    return this.client
      .get('/wraps', {
        params: { ethereumAddress, tezosAddress, status }
      })
      .then(({ data }) => data);
  }

  public fetchPendingUnwraps(
    ethereumAddress?: EthereumAddress,
    tezosAddress?: TezosAddress
  ): Promise<IndexerUnwrapPayload> {
    return this.fetchUnwrap('asked', ethereumAddress, tezosAddress);
  }

  public fetchFinalizedUnwraps(
    ethereumAddress?: EthereumAddress,
    tezosAddress?: TezosAddress
  ): Promise<IndexerUnwrapPayload> {
    return this.fetchUnwrap('finalized', ethereumAddress, tezosAddress);
  }

  private fetchUnwrap(
    status: string,
    ethereumAddress?: EthereumAddress,
    tezosAddress?: TezosAddress
  ): Promise<IndexerUnwrapPayload> {
    return this.client
      .get('/unwraps', {
        params: { ethereumAddress, tezosAddress, status }
      })
      .then(({ data }) => data);
  }

  public fetchWrapsByHash(hash: string): Promise<IndexerWrapPayload> {
    return this.client
      .get('/wraps', {
        params: { hash }
      })
      .then(({ data }) => data);
  }

  public fetchUnwrapsByHash(hash: string): Promise<IndexerUnwrapPayload> {
    return this.client
      .get('/unwraps', {
        params: { hash }
      })
      .then(({ data }) => data);
  }
}
