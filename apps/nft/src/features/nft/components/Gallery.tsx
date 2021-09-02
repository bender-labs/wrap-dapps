import { Container, Typography } from '@material-ui/core';
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
  const { tokens } = nftQuery;

  if (tokens.length === 0) {
    return (
      <Container maxWidth='lg' sx={{ display: 'flex', padding: 10, justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
        <Typography variant='h5' sx={{ color: 'white', display: 'flex' }}>You don't have any NFT tokens in this
          collection</Typography>
      </Container>
    );
  } else {
    return (
      <Container maxWidth='lg' sx={{ display: 'flex', paddingTop: 10 }}>
        {tokens.map((token) => {
          const link = direction === GalleryDirection.WRAP ? confirmNftWrap(token) : confirmNftUnwrap(token);
          return <NFTCard token={token} link={link} linkLabel={linkLabel} key={token.id} />;
        })}
      </Container>
    );
  }
}