import { TezosToolkit } from '@taquito/taquito';
import { Estimate } from '@taquito/taquito/dist/types/contract/estimate';
import { TezosAddress } from './TezosUnwrapApi';

export class TezosNftTransferApi {
  constructor(
    tezosWrappingContract: string,
    tezosTokenId: string,
    tzAccountAddress: TezosAddress,
    tzToolkit: TezosToolkit
  ) {
    this.tezosWrappingContract = tezosWrappingContract;
    this.tezosTokenId = tezosTokenId;
    this.tzAccountAddress = tzAccountAddress;
    this.tzToolkit = tzToolkit;
  }

  private async transferCall(tezosRecipientAddress: string) {
    const contract = await this.tzToolkit.wallet.at(this.tezosWrappingContract);
    const transfer_params = [
      {
        from_: this.tzAccountAddress,
        txs: [
          {
            to_: tezosRecipientAddress,
            token_id: this.tezosTokenId,
            amount: 1
          }
        ]
      }
    ];
    return contract.methods.transfer(transfer_params);
  }

  async transferNft(tezosRecipientAddress: string) {
    const call = await this.transferCall(tezosRecipientAddress);
    const result = await call.send({});
    return result.opHash;
  }

  async estimateTransferNft(tezosRecipientAddress: string): Promise<Estimate> {
    const call = await this.transferCall(tezosRecipientAddress);
    return await this.tzToolkit.estimate.transfer(call.toTransferParams({}));
  }

  private readonly tzAccountAddress: TezosAddress;
  private readonly tezosWrappingContract: string;
  private readonly tezosTokenId: string;
  private readonly tzToolkit: TezosToolkit;
}

export class TezosNftTransferApiFactory {
  constructor(tzAccountAddress: TezosAddress, tzToolkit: TezosToolkit) {
    this.tezosAccountAddress = tzAccountAddress;
    this.tzToolkit = tzToolkit;
  }

  public forErc721(
    tezosWrappingContract: string,
    tezosTokenId: string
  ): TezosNftTransferApi {
    return new TezosNftTransferApi(
      tezosWrappingContract,
      tezosTokenId,
      this.tezosAccountAddress,
      this.tzToolkit
    );
  }

  private readonly tzToolkit: TezosToolkit;
  private readonly tezosAccountAddress: TezosAddress;
}

export class TezosNftTransferApiBuilder {
  constructor(tzLibrary: TezosToolkit) {
    this.tzLibrary = tzLibrary;
  }

  public static withProvider(tzLibrary: TezosToolkit): TezosNftTransferApiBuilder {
    return new TezosNftTransferApiBuilder(tzLibrary);
  }

  public forAccount(tzAccountAddress: TezosAddress): TezosNftTransferApiBuilder {
    this.tzAccountAddress = tzAccountAddress;
    return this;
  }

  public createFactory() {
    if (this.tzAccountAddress === undefined) {
      throw new Error('Missing context for Tezos NFT Transfer Api initialization');
    }

    return new TezosNftTransferApiFactory(this.tzAccountAddress, this.tzLibrary);
  }

  private readonly tzLibrary: TezosToolkit;
  private tzAccountAddress: undefined | TezosAddress;
}
