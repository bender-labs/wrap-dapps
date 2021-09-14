import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, styled, Typography } from '@mui/material';
import { shadeOfBlack } from '@wrap-dapps/components/theme/theme';
import { NftInstance } from '../api/types';
import { Link } from 'react-router-dom';
import { GalleryDirection } from './Gallery';
import { TezosConnectionButton, TezosStateType, useTezosWalletContext } from '@wrap-dapps/features';

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
  margin: theme.spacing(1)
}));

export const NFTCard = ({ token, link, direction, transferLink }: NFTCardProps) => {
  const { state: tezosState } = useTezosWalletContext();
  const { name, thumbnailUri, id, nftCollection } = token;

  const TezosButton = () => {
    if (tezosState.type !== TezosStateType.CONNECTED) {
      return <TezosConnectionButton />;
    } else {
      return (
        <StyledLink to={link}>
          <StyledButton>
            Send to Tezos
          </StyledButton>
        </StyledLink>
      );
    }
  };

  const EthereumButton = () => {
    return (
      <StyledLink to={link}>
        <StyledButton>
          Send to Ethereum
        </StyledButton>
      </StyledLink>
    );
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
              <StyledButton>Tezos Transfer</StyledButton>
            </StyledLink>
            }
          </CardActions>
        </Card>
      </Box>
    </Grid>
  );
};