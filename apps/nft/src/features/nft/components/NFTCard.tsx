import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@material-ui/core';
import { shadeOfBlack } from '@wrap-dapps/components/theme/theme';
import { NftInstance } from '../api/types';
import { Link } from 'react-router-dom';
import { confirmNft } from '../../../pages';

export const NFTCard = ({ token }: { token: NftInstance }) => {
  const { name, thumbnailUri, id, nftCollection } = token;

  return (
    <Grid item lg={3} key={id}>
      <Box sx={{ maxWidth: 250 }}>
        <Card>
          <CardContent>
            <CardMedia sx={{
              height: 0,
              backgroundImage: '100%',
              paddingTop: '100%'
            }} image={thumbnailUri} title={name}
            />
            <Typography sx={{ color: shadeOfBlack }}>
              {nftCollection.ethereumName}
            </Typography>
            <Typography>
              {name}
            </Typography>
          </CardContent>
          <CardActions>
            <Link to={confirmNft(token)}>
              <Button>
                Wrap this NFT
              </Button>
            </Link>
          </CardActions>
        </Card>
      </Box>
    </Grid>
  );
};