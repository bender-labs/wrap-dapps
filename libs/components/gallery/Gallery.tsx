import { NFTCard } from './nftcard';
import { Button, CardActions, CardContent, Grid, Typography } from '@material-ui/core';

export default function Gallery() {

  const playerCards = [{
      title: "David Beckham",
      team: "PSG",
      id: '1',
      imageUrl: '971283'
    },
    {
      title: "Kylian Mbappe",
      team: "PSG",
      id: '2',
      imageUrl: '6754'
    },
    {
      title: "Thierry Henry",
      team: "Arsenal",
      id: '3',
      imageUrl: '7564'
    },
    {
      title: "Aubameyang",
      team: "Arsenal",
      id: '4',
      imageUrl: '4256'
    },
    {
      title: "Declan Rice",
      team: "West Ham",
      id: '1',
      imageUrl: '971283'
    },
    {
      title: "Ngolo Kante",
      team: "Chelsea",
      id: '2',
      imageUrl: '6754'
    },
    {
      title: "Paul Pogba",
      team: "Man Utd",
      id: '3',
      imageUrl: '7564'
    },
    {
      title: "Antoinne Griezmann",
      team: "Barcelona",
      id: '4',
      imageUrl: '4256'
    },
  ]
  const renderCard = (p: any) => {
    return (
      <Grid item lg={3}>
        <NFTCard>
          <CardContent>
            <Typography>
              {p.title}
            </Typography>
            <Typography>
              {p.team}
            </Typography>
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

  let active = true

  return (
    <Grid container spacing={{ xs: 6}}>
      {active ? (
        playerCards.map((p) => renderCard(p))
      ) : (<div>no data</div>)
      }

    </Grid>
    )
}