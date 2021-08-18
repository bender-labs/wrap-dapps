import { NftInstance } from './api/types';
import { NFTCard } from './NFTCard';
import { Button, CardActions, CardContent, CardMedia, Grid, Typography } from '@material-ui/core';
import Stack from '@material-ui/core/Stack';
import CircularProgress from '@material-ui/core/CircularProgress';
import Skeleton from '@material-ui/core/Skeleton';
import { shadeOfBlack } from '@wrap-dapps/components/theme/theme';

type GalleryProps = {
  tokens: NftInstance[];
}

const renderCard = (token: NftInstance) => {
  const { name, thumbnailUri, description, id } = token;

  return (
    <Grid item lg={3} key={id}>
      <NFTCard>
        {token ?
          (<>
            <CardContent>
              <CardMedia sx={{
                height: 0,
                backgroundImage: '100%',
                paddingTop: '100%'
              }} image={thumbnailUri} title={name + '\'s Sorare card'}
              />
              <Typography sx={{ color: shadeOfBlack }}>
                Collection name
              </Typography>
              <Typography>
                {name}
              </Typography>
            </CardContent>
            <CardActions>
              <Button>
                Wrap this NFT
              </Button>
            </CardActions>
          </>)
          : (
            <div style={{ backgroundColor: 'red', height: 400, width: 300 }}>
              <Stack>
                <Skeleton animation='wave' height={120} width='70%' />
                <Skeleton animation='wave' variant='rectangular' height={400} />
                <Skeleton animation='wave' height={100} />
              </Stack>
            </div>)}
      </NFTCard>
    </Grid>
  );
};

export default function Gallery({ tokens }: GalleryProps) {
  let loading = false;
  if (tokens.length === 0) {
    loading = true;
  }

  return (
    <Grid container spacing={{ xs: 6 }}>
      {loading ?
        <Stack sx={{ paddingTop: 12, width: 0, margin: 'auto' }}>
          <CircularProgress color='primary' />
        </Stack> :
        tokens.map((token) => renderCard(token))}
    </Grid>
  );
}