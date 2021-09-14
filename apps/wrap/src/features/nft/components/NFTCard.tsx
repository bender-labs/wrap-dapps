import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, styled, Typography } from '@mui/material';
import { shadeOfBlack } from '@wrap-dapps/components/theme/theme';
import { NftInstance } from '../api/types';
import { Link } from 'react-router-dom';
import { GalleryDirection } from './Gallery';
import {
  EthereumConnectionButton,
  EthereumStateType,
  TezosConnectionButton,
  TezosStateType,
  useEthereumWalletContext,
  useTezosWalletContext
} from '@wrap-dapps/features';

type NFTCardProps = {
  token: NftInstance;
  link: string;
  direction: GalleryDirection;
  transferLink?: string;
}

const StyledLink = styled(Link)(() => ({
  textDecoration: 'none',
  marginLeft: '0 !important'
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  color: 'black',
  backgroundColor: '#ffffff',
  borderRadius: '25px',
  boxShadow: 'none',
  textTransform: 'none',
  fontWeight: 900,
  '&:active': {
    boxShadow: 'none'
  },
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    boxShadow: 'none'
  },
  '&:disabled': {
    backgroundColor: 'rgba(0, 0, 0, 0.05)'
  }
}));

export const NFTCard = ({ token, link, direction, transferLink }: NFTCardProps) => {
  const { state: tezosState } = useTezosWalletContext();
  const { state: ethereumState } = useEthereumWalletContext();
  const { name, thumbnailUri, id, nftCollection } = token;

  const TezosButton = () => {
    if (tezosState.type !== TezosStateType.CONNECTED) {
      return <TezosConnectionButton />;
    } else {
      return (
        <StyledLink to={link}>
          <StyledButton variant={'contained'} color={'primary'}>
            Send to Tezos
          </StyledButton>
        </StyledLink>
      );
    }
  };

  const EthereumButton = () => {
    if (ethereumState.type !== EthereumStateType.CONNECTED) {
      return <EthereumConnectionButton />;
    } else {
      return (
        <StyledLink to={link}>
          <StyledButton variant={'contained'} color={'primary'}>
            Send to Ethereum
          </StyledButton>
        </StyledLink>
      );
    }
  };

  return (
    <Grid item lg={3} key={id}>
      <Box sx={{ margin: 1 }}>
        <Card>
          <CardContent>
            <CardMedia sx={{
              height: 0,
              backgroundSize: 'contain',
              paddingTop: '100%'
            }} image={thumbnailUri} title={name}
            />
            <Typography sx={{ color: shadeOfBlack, paddingTop: 1, fontSize: '10px' }} align='center'>
              {nftCollection.ethereumName}
            </Typography>
            <Typography sx={{ color: shadeOfBlack, paddingTop: 3 }} align='center'>
              {name}
            </Typography>
          </CardContent>
          <CardActions sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: 3 }}>
            {direction === GalleryDirection.WRAP ? TezosButton() : EthereumButton()}
            {transferLink &&
            <StyledLink to={transferLink}>
              <StyledButton variant={'contained'} color={'primary'}>Tezos Transfer</StyledButton>
            </StyledLink>
            }
          </CardActions>
        </Card>
      </Box>
    </Grid>
  );
};