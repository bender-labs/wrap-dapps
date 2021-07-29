import { NFTCard } from '@wrap-dapps/components/gallery/nftcard';
import { Button, CardActions, CardContent, CardMedia, Grid, Typography } from '@material-ui/core';
import { NftInstance } from './api/types';

export const renderCard = ({name, thumbnailUri, description, id}: NftInstance) => {
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
            Next
          </Button>
        </CardActions>
      </NFTCard>
    </Grid>
  )
}