import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, styled, Typography } from '@mui/material';
import { shadeOfBlack } from '@wrap-dapps/components/theme/theme';
import { NftInstance } from '../api/types';
import { Link } from 'react-router-dom';

type NFTCardProps = {
  token: NftInstance;
  link: string;
  linkLabel: string;
}

const StyledLink = styled(Link)(() => ({
  textDecoration: 'none'
}));

export const NFTCard = ({ token, link, linkLabel }: NFTCardProps) => {
  const { name, thumbnailUri, id, nftCollection } = token;

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
          <CardActions sx={{display: 'flex', justifyContent: 'center', paddingBottom: 3}}>
            <StyledLink to={link}>
              <Button>
                {linkLabel}
              </Button>
            </StyledLink>
          </CardActions>
        </Card>
      </Box>
    </Grid>
  );
};