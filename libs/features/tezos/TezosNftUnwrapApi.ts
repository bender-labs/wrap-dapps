import { TezosToolkit } from '@taquito/taquito';
import { Fees } from '@wrap-dapps/api';
import { Estimate } from '@taquito/taquito/dist/types/contract/estimate';
import { EthereumAddress, TezosAddress } from './TezosUnwrapApi';
import BigNumber from 'bignumber.js';

export class TezosNftUnwrapApi {
  constructor(
    erc721ContractAddress: EthereumAddress,
    tezosWrappingContract: string,
    tezosTokenId: string,
    minterContract: string,
    ethAccountAddress: EthereumAddress,
    tzAccountAddress: TezosAddress,
    tzToolkit: TezosToolkit,
    fees: Fees
  ) {
    this.erc721ContractAddress = erc721ContractAddress;
    this.tezosWrappingContract = tezosWrappingContract;
    this.tezosTokenId = tezosTokenId;
    this.minterContract = minterContract;
    this.ethAccountAddress = ethAccountAddress;
    this.tzAccountAddress = tzAccountAddress;
    this.tzToolkit = tzToolkit;
    this.fees = fees;
  }

  private async unwrap_call() {
    const contract = await this.tzToolkit.wallet.at(this.minterContract);
    return contract.methods.unwrap_erc721(
      this.erc721ContractAddress.toLowerCase().substring(2),
      this.tezosTokenId,
      this.ethAccountAddress.toLowerCase().substring(2)
    );
  }

  async unwrapNft(fees: BigNumber) {
    const call = await this.unwrap_call();
    const result = await call.send({ amount: fees.toNumber(), mutez: true });
    return result.opHash;
  }

  async estimateUnwrapNetworkFees(fees: BigNumber): Promise<Estimate> {
    const call = await this.unwrap_call();
    return await this.tzToolkit.estimate.transfer(call.toTransferParams({ amount: fees.toNumber(), mutez: true }));
  }

  private readonly ethAccountAddress: EthereumAddress;
  private readonly tzAccountAddress: TezosAddress;
  private readonly minterContract: string;
  private readonly tezosWrappingContract: string;
  private readonly tezosTokenId: string;
  private readonly tzToolkit: TezosToolkit;
  private readonly erc721ContractAddress: EthereumAddress;
  private readonly fees: Fees;
}

export class TezosNftUnwrapApiFactory {
  constructor(
    minterContract: string,
    ethAccountAddress: EthereumAddress,
    tzAccountAddress: TezosAddress,
    tzToolkit: TezosToolkit,
    fees: Fees
  ) {
    this.ethAccountAddress = ethAccountAddress;
    this.tezosAccountAddress = tzAccountAddress;
    this.minterContract = minterContract;
    this.tzToolkit = tzToolkit;
    this.fees = fees;
  }

  public forErc721(
    erc721ContractAddress: EthereumAddress,
    tezosWrappingContract: string,
    tezosTokenId: string
  ): TezosNftUnwrapApi {
    return new TezosNftUnwrapApi(
      erc721ContractAddress,
      tezosWrappingContract,
      tezosTokenId,
      this.minterContract,
      this.ethAccountAddress,
      this.tezosAccountAddress,
      this.tzToolkit,
      this.fees
    );
  }

  private readonly tzToolkit: TezosToolkit;
  private readonly minterContract: string;
  private readonly ethAccountAddress: EthereumAddress;
  private readonly tezosAccountAddress: TezosAddress;
  private readonly fees: Fees;
}

export class TezosNftUnwrapApiBuilder {
  constructor(tzLibrary: TezosToolkit) {
    this.tzLibrary = tzLibrary;
  }

  public static withProvider(tzLibrary: TezosToolkit): TezosNftUnwrapApiBuilder {
    return new TezosNftUnwrapApiBuilder(tzLibrary);
  }

  public forAccount(
    ethAccountAddress: EthereumAddress,
    tzAccountAddress: TezosAddress
  ): TezosNftUnwrapApiBuilder {
    this.ethAccountAddress = ethAccountAddress;
    this.tzAccountAddress = tzAccountAddress;
    return this;
  }

  public forMinterContract(
    minterContractAddress: string
  ): TezosNftUnwrapApiBuilder {
    this.minterContractAddress = minterContractAddress;
    return this;
  }

  public forFees(fees: Fees): TezosNftUnwrapApiBuilder {
    this.fees = fees;
    return this;
  }

  public createFactory() {
    if (
      this.ethAccountAddress === undefined ||
      this.tzAccountAddress === undefined ||
      this.minterContractAddress === undefined ||
      this.tzLibrary === undefined ||
      this.fees === undefined
    ) {
      throw new Error('Missing context for Tezos NFT Unwrap Api initialization');
    }

    return new TezosNftUnwrapApiFactory(
      this.minterContractAddress,
      this.ethAccountAddress,
      this.tzAccountAddress,
      this.tzLibrary,
      this.fees
    );
  }

  private readonly tzLibrary: TezosToolkit;
  private minterContractAddress: undefined | string;
  private ethAccountAddress: undefined | EthereumAddress;
  private tzAccountAddress: undefined | TezosAddress;
  private fees: undefined | Fees;
}
