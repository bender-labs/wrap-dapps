import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@material-ui/core';
import { shadeOfBlack } from '@wrap-dapps/components/theme/theme';
import { NftInstance } from '../api/types';
import { Link } from 'react-router-dom';

type NFTCardProps = {
  token: NftInstance;
  link: string;
  linkLabel: string;
}

export const NFTCard = ({ token, link, linkLabel }: NFTCardProps) => {
  const { name, thumbnailUri, id, nftCollection } = token;

  return (
    <Grid item lg={3} key={id}>
      <Box sx={{ margin: 1 }}>
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
            <Link to={link}>
              <Button>
                {linkLabel}
              </Button>
            </Link>
          </CardActions>
        </Card>
      </Box>
    </Grid>
  );
};