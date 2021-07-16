import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@material-ui/core';
import AmountToWrapInput from '../form/AmountToWrapInput';
import BigNumber from 'bignumber.js';

type AmountInputProps = {
  balance: BigNumber;
  decimals: number;
  symbol: string;
  onChange: (amount: BigNumber) => void;
  amountToWrap: BigNumber;
  balanceLoading: boolean;
  disabled?: boolean;
};

export const TabsCard = () => {
  return (
      <Card>
        <CardContent>
          tabs
        </CardContent>
      </Card>
    )

}

export const DropDownCard = () => {
  return (
    <Card>
      <CardHeader title={'Drop Down Card'} />
      <CardContent>

      </CardContent>
    </Card>
  );
};

export function AmountToInputCard({
  balance,
  amountToWrap,
  decimals,
  symbol,
  onChange,
  balanceLoading,
  disabled,
}: AmountInputProps) {
  const handleOnChange = () => {};
  return (
    <Card>
      <CardContent>
        <Box>
          <AmountToWrapInput
            balance={new BigNumber(123123)}
            balanceLoading={true}
            onChange={onChange}
            symbol={symbol}
            decimals={0}
            amountToWrap={new BigNumber(123123)}
          />
        </Box>

      </CardContent>
    </Card>
  );
}

export const ReceiveCard = () => {
  return (
    <Card>
      <CardContent>
        Receive card
      </CardContent>
    </Card>
  );
};

export const NextCard = () => {
  return (
    <Card>
      <CardContent>
        Next Card
      </CardContent>
    </Card>
  );
};
