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

export const DropDownCard = () => {
  return (
    <Card>
      <CardHeader title={'Drop Down Card'} />
      <Box
        sx={{
          backgroundColor: 'red',
          display: 'flex',
          minHeight: 100,
        }}
      ></Box>
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
      <Box
        sx={{
          display: 'flex',
          backgroundColor: 'white',
          justifyContent: 'center',
        }}
      >
        <AmountToWrapInput
          balance={new BigNumber(123123)}
          balanceLoading={true}
          onChange={onChange}
          symbol={symbol}
          decimals={0}
          amountToWrap={new BigNumber(123123)}
        />
      </Box>
    </Card>
  );
}

export const ReceiveCard = () => {
  return (
    <Card>
      <Box
        sx={{
          display: 'flex',
          backgroundColor: 'blue',
          minHeight: 60,
        }}
      >
        <Typography>Receive card</Typography>
      </Box>
    </Card>
  );
};

export const NextCard = () => {
  return (
    <Card>
      <Box
        sx={{
          display: 'flex',
          backgroundColor: 'green',
          minHeight: 60,
        }}
      >
        <Typography>Next Card</Typography>
      </Box>
    </Card>
  );
};
