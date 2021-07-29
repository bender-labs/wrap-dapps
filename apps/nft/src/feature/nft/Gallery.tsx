import { Grid } from '@material-ui/core';
import { NftInstance, NftPage } from './api/types';
import { renderCard } from './renderCard';
import { useEffect, useState } from 'react';

// type GalleryProps = {
//   results: Promise<NftInstance>;
//   data: NftInstance[];
// }

export default function Gallery() {

  // const [tokenData, setTokenData] = useState(data)
  //
  // useEffect(() => {
  //   console.log(tokenData)
  //   setTokenData(data)
  // }, [tokenData])


  return (
    <Grid container spacing={{ xs: 6}}>
      {/*{tokenData !== undefined  ? (*/}
      {/*  tokenData.map((p) => renderCard(p))*/}
      {/*) : (<div>no data</div>)*/}
      {/*}*/}

    </Grid>
    )
}