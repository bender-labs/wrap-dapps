import { OpKind, TezosToolkit, WalletParamsWithKind } from '@taquito/taquito';
import BigNumber from 'bignumber.js';
import { StackingConfig } from '@wrap-dapps/components';
import { tzip16 } from '@taquito/tzip16';
import { WrapUnstakeInfo } from '../WrapStackingUnstake';

export interface FeesLevel {
  maxLevel: number,
  feesPercent: number
}

export interface WrapStackingFees {
  default: number,
  levels: FeesLevel[]
}

export interface WrapStackingStakeInfo {
  id: BigNumber,
  level: BigNumber,
  amount: BigNumber,
  fees_ratio: BigNumber
}

export class WrapStackingApi {
  private library: TezosToolkit;

  constructor(library: TezosToolkit) {
    this.library = library;
  }

  public async stake(
    account: string,
    amount: BigNumber,
    stacking: StackingConfig
  ): Promise<string> {
    const addOperator = WrapStackingApi.updateOperatorTransaction(stacking.reward.contractAddress, account, stacking.stackingContract);
    const stake = WrapStackingApi.stakeOperation(stacking.stackingContract, amount.toString(10));
    const opg = await this.library.wallet
      .batch()
      .with([addOperator])
      .with([stake])
      .send();
    await opg.receipt();
    return opg.opHash;
  }

  private static updateOperatorTransaction(farmStakedToken: string, owner: string, wrapStackingContractAddress: string): WalletParamsWithKind {
    return {
      kind: OpKind.TRANSACTION,
      to: farmStakedToken,
      amount: 0,
      mutez: false,
      parameter: {
        entrypoint: 'update_operators',
        value: [
          {
            prim: 'Left',
            args: [
              {
                prim: 'Pair',
                args: [
                  {
                    string: owner
                  },
                  {
                    prim: 'Pair',
                    args: [
                      {
                        string: wrapStackingContractAddress
                      },
                      {
                        int: '0'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    };
  }

  private static stakeOperation(wrapStackingContract: string, amount: string): WalletParamsWithKind {
    return {
      kind: OpKind.TRANSACTION,
      to: wrapStackingContract,
      amount: 0,
      mutez: false,
      parameter: {
        entrypoint: 'stake',
        value: {
          int: amount
        }
      }
    };
  }

  public async unstake(
    stacking: StackingConfig,
    validWrapUnstakesInfos: WrapUnstakeInfo[]
  ): Promise<string> {
    try {
      const unstakes = validWrapUnstakesInfos.map((wrapUnstakeInfos): WalletParamsWithKind => WrapStackingApi.unstakeOperation(stacking.stackingContract, wrapUnstakeInfos));
      const opg = await this.library.wallet.batch()
        .with(unstakes).send();
      await opg.receipt();
      return opg.opHash;
    } catch (err) {
      console.log(err);
      return '';
    }
  }

  private static unstakeOperation(stackingContractAddress: string, wrapUnstakeInfos: WrapUnstakeInfo): WalletParamsWithKind {
    return {
      kind: OpKind.TRANSACTION,
      to: stackingContractAddress,
      amount: 0,
      mutez: false,
      parameter: {
        entrypoint: 'withdraw',
        value: [
          {
            int: wrapUnstakeInfos.id.toString(10)
          },
          {
            int: wrapUnstakeInfos.amount.toString(10)
          }
        ]
      }
    };
  }

  public async claim(stackingContractAddress: string): Promise<string> {
    const stackingContract = await this.library.wallet.at(stackingContractAddress);
    const opg = await stackingContract.methods.claim({}).send();
    await opg.receipt();
    return opg.opHash;
  }

  public async extractInfoForOwner(
    stackingContractAddress: string,
    owner: string
  ): Promise<{ totalSupply: BigNumber; staked: BigNumber; reward: BigNumber, stakes: WrapStackingStakeInfo[] }> {
    const wrapStackingContract = await this.library.wallet.at(stackingContractAddress, tzip16);
    const views = await wrapStackingContract.tzip16().metadataViews();
    const [staked, reward, totalSupply, stakes] = await Promise.all([
      views.get_balance().executeView(owner),
      views.get_earned().executeView(owner),
      views.total_supply().executeView(),
      views.get_stakes().executeView(owner)
    ]);
    return { totalSupply, staked, reward, stakes };
  }
}
