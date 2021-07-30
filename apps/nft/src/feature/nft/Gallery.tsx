import { NftInstance, NftPage } from './api/types';
import { NFTCard } from '@wrap-dapps/components/gallery/nftcard';
import { Button, CardActions, CardContent, CardMedia, Grid, Typography } from '@material-ui/core';

type GalleryProps = {
  tokens: NftInstance[];
}

const renderCard = ({name, thumbnailUri, description, id}: NftInstance) => {
  return (
    <Grid item lg={3} key={id}>
      <NFTCard>
        <CardContent>
          <Typography>
            {name}
          </Typography>
          <Typography>
            {description}
          </Typography>
          <CardMedia sx={{
            height: 0,
            paddingTop: '56.7%',
          }}
                     image={thumbnailUri}
                     title={name + "'s Sorare card"}
          />
        </CardContent>
        <CardActions>
          <Button>
            Select to Wrap
          </Button>
        </CardActions>
      </NFTCard>
    </Grid>
  )
}

export default function Gallery({tokens}: GalleryProps) {



  return (
    <Grid container spacing={{ xs: 6}}>

      {tokens.map((p) => renderCard(p))}


    </Grid>
    )
}