import { Grid } from '@material-ui/core';
import Stack from '@material-ui/core/Stack';
import CircularProgress from '@material-ui/core/CircularProgress';
import { NFTCard } from './NFTCard';
import { NftQuery } from '../hook/useEthereumNftQuery';
import { confirmNftUnwrap, confirmNftWrap } from '../../../pages';

export enum GalleryDirection {
  WRAP,
  UNWRAP
}

type GalleryProps = {
  nftQuery: NftQuery;
  direction: GalleryDirection;
  linkLabel: string;
}

export default function Gallery({ nftQuery, direction, linkLabel }: GalleryProps) {
  const { tokens, loading } = nftQuery;

  return (
    <Grid container spacing={{ xs: 6 }}>
      {loading ?
        <Stack sx={{ paddingTop: 12, width: 0, margin: 'auto' }}>
          <CircularProgress color='primary' />
        </Stack> :
        tokens.map((token) => {
          const link = direction === GalleryDirection.WRAP ? confirmNftWrap(token) : confirmNftUnwrap(token);
          return <NFTCard token={token} link={link} linkLabel={linkLabel} key={token.id} />;
        })
      }
    </Grid>
  );
}