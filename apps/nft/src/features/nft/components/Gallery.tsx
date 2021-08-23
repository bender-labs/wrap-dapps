import { Grid } from '@material-ui/core';
import Stack from '@material-ui/core/Stack';
import CircularProgress from '@material-ui/core/CircularProgress';
import { NFTCard } from './NFTCard';
import { NftQuery } from '../hook/useNftQuery';

type GalleryProps = {
  nftQuery: NftQuery
}

export default function Gallery({ nftQuery }: GalleryProps) {
  const { tokens, loading } = nftQuery;

  return (
    <Grid container spacing={{ xs: 6 }}>
      {loading ?
        <Stack sx={{ paddingTop: 12, width: 0, margin: 'auto' }}>
          <CircularProgress color='primary' />
        </Stack> :
        tokens.map((token) => (<NFTCard token={token} key={token.id} />))
      }
    </Grid>
  );
}