import { Backdrop, Container, Typography } from '@mui/material';
import { NFTCard } from './NFTCard';
import { NftQuery } from '../hook/useEthereumNftQuery';
import { confirmNftUnwrap, confirmNftWrap, tezosTransfer } from '../../../pages/routes';

export enum GalleryDirection {
  WRAP,
  UNWRAP
}

type GalleryProps = {
  nftQuery: NftQuery;
  direction: GalleryDirection;
}

export default function Gallery({ nftQuery, direction }: GalleryProps) {
  const { tokens: nftInstances } = nftQuery;

  if (nftInstances.length === 0) {
    return (
      <Container maxWidth='lg'
                 sx={{ display: 'flex', padding: 10, justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
        <Typography variant='h5' sx={{ color: 'white', display: 'flex' }}>You don't have any NFT tokens in this
          collection</Typography>
      </Container>
    );
  } else {
    return (
      <Container maxWidth='lg' sx={{ display: 'flex', padding: 10 }}>
        {nftInstances.map((nftInstance) => {
          if (direction === GalleryDirection.WRAP) {
            return <NFTCard token={nftInstance} link={confirmNftWrap(nftInstance)} direction={direction}
                            key={nftInstance.id} />;
          } else {
            return <NFTCard token={nftInstance} link={confirmNftUnwrap(nftInstance)} direction={direction}
                            key={nftInstance.id} transferLink={tezosTransfer(nftInstance)} />;
          }
        })}
      </Container>
    );
  }
}