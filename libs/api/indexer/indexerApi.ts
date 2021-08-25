import { IndexerTezosNftPayload, IndexerUnwrapPayload, IndexerWrapPayload, WrapConfiguration } from './types';
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
    return this.fetchWraps('asked', 'ERC20', ethereumAddress, tezosAddress);
  }

  public fetchPendingNftWraps(
    ethereumAddress?: EthereumAddress,
    tezosAddress?: TezosAddress
  ): Promise<IndexerWrapPayload> {
    return this.fetchWraps('asked', 'ERC721', ethereumAddress, tezosAddress);
  }

  public fetchFinalizedWraps(
    ethereumAddress?: EthereumAddress,
    tezosAddress?: TezosAddress
  ): Promise<IndexerWrapPayload> {
    return this.fetchWraps('finalized', 'ERC20', ethereumAddress, tezosAddress);
  }

  public fetchFinalizedNftWraps(
    ethereumAddress?: EthereumAddress,
    tezosAddress?: TezosAddress
  ): Promise<IndexerWrapPayload> {
    return this.fetchWraps('finalized', 'ERC721', ethereumAddress, tezosAddress);
  }

  private fetchWraps(
    status: string,
    type: string,
    ethereumAddress?: EthereumAddress,
    tezosAddress?: TezosAddress
  ): Promise<IndexerWrapPayload> {
    return this.client
      .get('/wraps', {
        params: { ethereumAddress, tezosAddress, status, type }
      })
      .then(({ data }) => data);
  }

  public fetchPendingUnwraps(
    ethereumAddress?: EthereumAddress,
    tezosAddress?: TezosAddress
  ): Promise<IndexerUnwrapPayload> {
    return this.fetchUnwrap('asked', 'ERC20', ethereumAddress, tezosAddress);
  }

  public fetchPendingNftUnwraps(
    ethereumAddress?: EthereumAddress,
    tezosAddress?: TezosAddress
  ): Promise<IndexerUnwrapPayload> {
    return this.fetchUnwrap('asked', 'ERC721', ethereumAddress, tezosAddress);
  }

  public fetchFinalizedUnwraps(
    ethereumAddress?: EthereumAddress,
    tezosAddress?: TezosAddress
  ): Promise<IndexerUnwrapPayload> {
    return this.fetchUnwrap('finalized', 'ERC20', ethereumAddress, tezosAddress);
  }

  public fetchFinalizedNftUnwraps(
    ethereumAddress?: EthereumAddress,
    tezosAddress?: TezosAddress
  ): Promise<IndexerUnwrapPayload> {
    return this.fetchUnwrap('finalized', 'ERC721', ethereumAddress, tezosAddress);
  }

  private fetchUnwrap(
    status: string,
    type: string,
    ethereumAddress?: EthereumAddress,
    tezosAddress?: TezosAddress
  ): Promise<IndexerUnwrapPayload> {
    return this.client
      .get('/unwraps', {
        params: { ethereumAddress, tezosAddress, status, type }
      })
      .then(({ data }) => data);
  }

  public fetchWrapsByHash(hash: string, type: string): Promise<IndexerWrapPayload> {
    return this.client
      .get('/wraps', {
        params: { hash, type }
      })
      .then(({ data }) => data);
  }

  public fetchUnwrapsByHash(hash: string, type: string): Promise<IndexerUnwrapPayload> {
    return this.client
      .get('/unwraps', {
        params: { hash, type }
      })
      .then(({ data }) => data);
  }

  public fetchTezosNft(tezosAddress: string, contractAddress: string): Promise<IndexerTezosNftPayload> {
    return this.client
      .get('/tezos-nfts', {
        params: { tezosAddress, contractAddress }
      })
      .then(({ data }) => data);
  }
}
