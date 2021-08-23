import { Web3Provider } from '@ethersproject/providers';
import { ethers } from 'ethers';
import ERC721_ABI from './erc721Abi';
import CUSTODIAN_ABI from './custodianContractAbi';
import { EthereumAddress, TezosAddress } from './EthereumWrapApi';
import BigNumber from 'bignumber.js';

export class EthereumNftWrapApi {
  constructor(
    erc721Contract: ethers.Contract,
    custodianContract: ethers.Contract,
    ethAccountAddress: EthereumAddress,
    tzAccountAddress: TezosAddress
  ) {
    this.erc721Contract = erc721Contract;
    this.custodianContract = custodianContract;
    this.ethAccountAddress = ethAccountAddress;
    this.tzAccountAddress = tzAccountAddress;
  }

  async getCurrentApprovedAddress(tokenId: string): Promise<string> {
    return this.erc721Contract.getApproved(tokenId);
  }

  async estimateApprove(tokenId: string): Promise<ethers.BigNumber> {
    try {
      return await this.erc721Contract.estimateGas.approve(this.benderContractAddress(), tokenId, {
        gasLimit: 1000000
      });
    } catch(err) {
      return ethers.BigNumber.from('100000');
    }
  }

  async approve(tokenId: string) {
    const estimate = await this.estimateApprove(tokenId);
    return this.erc721Contract.approve(this.benderContractAddress(), tokenId, {
      gasLimit: estimate.add(estimate.div(2)).toNumber()
    });
  }

  async isApproved(tokenId: string): Promise<boolean> {
    const currentApprovedAddress = await this.getCurrentApprovedAddress(tokenId);
    return currentApprovedAddress === this.benderContractAddress();
  }

  async estimateWrapNft(tokenId: string): Promise<ethers.BigNumber> {
    try {
      return await this.custodianContract.estimateGas.wrapERC721(
        this.erc721Contract.address,
        tokenId,
        this.tzAccountAddress,
        {
          gasLimit: '1000000'
        }
      );
    } catch(err) {
      return ethers.BigNumber.from('300000');
    }
  }

  async wrapNft(tokenId: string): Promise<string> {
    const gasEstimate = await this.estimateWrapNft(tokenId);
    const response: ethers.providers.TransactionResponse = await this.custodianContract.wrapERC721(
      this.erc721Contract.address,
      tokenId,
      this.tzAccountAddress,
      {
        gasLimit: gasEstimate.add(gasEstimate.div(2)).toNumber()
      }
    );
    return response.hash;
  }

  async networkFees(provider: Web3Provider, tokenId: string): Promise<BigNumber> {
    const gas = await this.estimateWrapNft(tokenId);
    const gasPrice = await provider.getGasPrice();
    const fees = gas.mul(gasPrice);
    return new BigNumber(fees.toString(), 10);
  }

  private benderContractAddress() {
    return this.custodianContract.address;
  }

  private readonly erc721Contract: ethers.Contract;
  private readonly custodianContract: ethers.Contract;
  private readonly ethAccountAddress: EthereumAddress;
  private readonly tzAccountAddress: TezosAddress;
}

export class EthereumNftWrapApiFactory {
  constructor(
    benderContract: ethers.Contract,
    ethAccountAddress: EthereumAddress,
    tzAccountAddress: TezosAddress,
    provider: Web3Provider
  ) {
    this.ethAccountAddress = ethAccountAddress;
    this.tezosAccountAddress = tzAccountAddress;
    this.benderContract = benderContract;
    this.provider = provider;
  }

  public forErc721(erc721ContractAddress: EthereumAddress): EthereumNftWrapApi {
    return new EthereumNftWrapApi(
      new ethers.Contract(
        erc721ContractAddress,
        new ethers.utils.Interface(ERC721_ABI),
        this.provider.getSigner()
      ),
      this.benderContract,
      this.ethAccountAddress,
      this.tezosAccountAddress
    );
  }

  private readonly provider: Web3Provider;
  private readonly benderContract: ethers.Contract;
  private readonly ethAccountAddress: EthereumAddress;
  private readonly tezosAccountAddress: TezosAddress;
}

export class EthereumNftWrapApiBuilder {
  constructor(provider: Web3Provider) {
    this.provider = provider;
  }

  public static withProvider(provider: Web3Provider): EthereumNftWrapApiBuilder {
    return new EthereumNftWrapApiBuilder(provider);
  }

  public forAccount(
    ethAccountAddress: EthereumAddress,
    tzAccountAddress: TezosAddress
  ): EthereumNftWrapApiBuilder {
    this.ethAccountAddress = ethAccountAddress;
    this.tzAccountAddress = tzAccountAddress;
    return this;
  }

  public forCustodianContract(
    contractAddress: EthereumAddress
  ): EthereumNftWrapApiBuilder {
    this.custodianContractAddress = contractAddress;
    return this;
  }

  public createFactory() {
    if (
      this.provider === undefined ||
      this.ethAccountAddress === undefined ||
      this.custodianContractAddress === undefined ||
      this.tzAccountAddress === undefined
    ) {
      throw new Error('Missing context for Ethereum Nft Wrap Api initialization');
    }

    return new EthereumNftWrapApiFactory(
      new ethers.Contract(
        this.custodianContractAddress,
        new ethers.utils.Interface(CUSTODIAN_ABI),
        this.provider.getSigner()
      ),
      this.ethAccountAddress,
      this.tzAccountAddress,
      this.provider
    );
  }

  private readonly provider: Web3Provider;
  private custodianContractAddress: undefined | EthereumAddress;
  private ethAccountAddress: undefined | EthereumAddress;
  private tzAccountAddress: undefined | TezosAddress;
}
