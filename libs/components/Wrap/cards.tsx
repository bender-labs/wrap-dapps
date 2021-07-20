import {
  Box,
  Card,
  CardContent,
  CardHeader,
    Button,
  Typography,
} from '@material-ui/core';
// import BigNumber from 'bignumber.js';
// import { SupportedBlockchain } from '../wallet/blockchain';
// import { TokenMetadata } from '../token/type';

import { yellow } from '@material-ui/core/colors';

// type AmountInputProps = {
//   balance: BigNumber;
//   decimals: number;
//   symbol: string;
//   onChange: (amount: BigNumber) => void;
//   amountToWrap: BigNumber;
//   balanceLoading: boolean;
//   disabled?: boolean;
// };
//
//
// type TokenSelectionProps = {
//   token: TokenMetadata;
//   onTokenSelect: (token: string) => void;
//   blockchainTarget: SupportedBlockchain;
//   tokens: Record<string, TokenMetadata>;
// };

export const TabsCard = () => {
  return (
      <Card>
        <CardContent>
          tabs
        </CardContent>
      </Card>
    )

}

// const DropDownCard = () => {
//   return (
//     <Card>
//       <CardHeader title={'Drop Down Card'} />
//       <CardContent>
//
//       </CardContent>
//     </Card>
//   );
// };



// function AmountToInputCard({
//   balance,
//   amountToWrap,
//   decimals,
//   symbol,
//   onChange,
//   balanceLoading,
//   disabled,
// }: AmountInputProps) {
//   return (
//         <Box>
//           <AmountToWrapInput
//             balance={balance}
//             balanceLoading={balanceLoading}
//             onChange={onChange}
//             symbol={symbol}
//             decimals={decimals}
//             amountToWrap={amountToWrap}
//           />
//         </Box>
//
//
//   );
// }



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
