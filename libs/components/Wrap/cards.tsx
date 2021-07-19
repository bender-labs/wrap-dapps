import {
  Box,
  Card,
  CardContent,
  CardHeader,
    Button,
  Typography,
} from '@material-ui/core';
import AmountToWrapInput from '../form/AmountToWrapInput';
import BigNumber from 'bignumber.js';
import { yellow } from '@material-ui/core/colors';

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
    <Card sx={{
      color: 'white',
      backgroundColor: '#343434'
    }
    }>
      <CardContent>
        Receive card
      </CardContent>
    </Card>
  );
};

export const NextCard = () => {
  return (
    <Card sx={{borderRadius: '0 0 15px 15px'}}>
      <CardContent>
        Next Card
          <Button
              variant={'contained'}
              color={'primary'}
              disabled
              sx={{
                  color: 'black',
                  backgroundColor: '#ffffff',
                  width: '40%',
                  borderRadius: '25px',
                  float: 'right',
                  boxShadow: 'none',
                  textTransform: 'none',
                  fontWeight: 900,
                  '&:active': {
                      boxShadow: 'none',
                  },
                  '&:hover': {
                      backgroundColor: yellow,
                      boxShadow: 'none',
                  },
                  '&:disabled': {
                      backgroundColor: 'rgba(0, 0, 0, 0.05)',
                  },
              }}
          >
              Next →
          </Button>
      </CardContent>
    </Card>
  );
};
