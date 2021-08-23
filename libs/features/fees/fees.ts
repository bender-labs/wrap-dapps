import BigNumber from 'bignumber.js';
import { Fees } from '@wrap-dapps/api';

export function wrapERC721Fees(fees: Fees) {
  return new BigNumber(fees.erc721WrappingFees);
}

export function unwrapERC721Fees(fees: Fees) {
  return new BigNumber(fees.erc721UnwrappingFees);
}

export function wrapERC20Fees(amount: BigNumber, fees: Fees) {
  return amount
    .div(10000)
    .multipliedBy(fees.erc20WrappingFees)
    .decimalPlaces(0, BigNumber.ROUND_HALF_EVEN);
}

export function unwrapERC20Fees(amount: BigNumber, fees: Fees) {
  return amount
    .div(10000)
    .multipliedBy(fees.erc20UnwrappingFees)
    .decimalPlaces(0, BigNumber.ROUND_HALF_EVEN);
}

export function unwrapERC20AmountsFromTotal(amount: BigNumber, fees: Fees) {
  const withoutFees = amount.div(
    new BigNumber(fees.erc20UnwrappingFees).div(10000).plus(1)
  );
  return [
    withoutFees.decimalPlaces(0, BigNumber.ROUND_HALF_DOWN),
    amount.minus(withoutFees).decimalPlaces(0, BigNumber.ROUND_HALF_UP)
  ];
}
