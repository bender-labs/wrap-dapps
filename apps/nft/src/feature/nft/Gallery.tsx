import { NFTCard } from '@wrap-dapps/components/gallery/nftcard';
import { Button, CardActions, CardContent, CardMedia, Grid, Typography } from '@material-ui/core';

export default function Gallery() {

  const playerCards = [{
      name: "David Beckham",
      description: "",
      image: "../../static/img/Beckham.jpg",
      attributes: [
        {
          "trait_type": "team",
          "value": "PSG"
        },
        {
            "trait_type": "scarcity",
            "value": "Rare"
        },
        {
            "trait_type": "position",
            "value": "Midfielder"
        },
        {
            "trait_type": "jersey",
            "value": "home"
        },
      ],
      id: '1',
    },
    {
      name: "Kylian Mbappe",
      description: "",
      image: "",
      attributes: [
        {
          "trait_type": "team",
          "value": "PSG"
        },
        {
          "trait_type": "scarcity",
          "value": "Rare"
        },
        {
          "trait_type": "position",
          "value": "Forward"
        },
        {
          "trait_type": "jersey",
          "value": "home"
        },
      ],
      id: '2',
    },
    {
      name: "Thierry Henry",
      description: "",
      image: "",
      attributes: [
        {
          "trait_type": "team",
          "value": "Arsenal"
        },
        {
          "trait_type": "scarcity",
          "value": "Super Rare"
        },
        {
          "trait_type": "position",
          "value": "Forward"
        },
        {
          "trait_type": "jersey",
          "value": "Home"
        },
      ],
      id: '3',
    },
    {
      name: "Aubameyang",
      description: "",
      image: "",
      attributes: [
        {
          "trait_type": "team",
          "value": "Arsenal"
        },
        {
          "trait_type": "scarcity",
          "value": "Normal"
        },
        {
          "trait_type": "position",
          "value": "Forward"
        },
        {
          "trait_type": "jersey",
          "value": "away"
        },
      ],
      id: '4',
    },
    {
      name: "Declan Rice",
      description: "",
      image: "",
      attributes: [
        {
          "trait_type": "team",
          "value": "West Ham"
        },
        {
          "trait_type": "scarcity",
          "value": "Normal"
        },
        {
          "trait_type": "position",
          "value": "Midfielder"
        },
        {
          "trait_type": "jersey",
          "value": "away"
        },
      ],
      id: '5',
    },
    {
      name: "Ngolo Kante",
      description: "",
      image: "",
      attributes: [
        {
          "trait_type": "team",
          "value": "Chelsea"
        },
        {
          "trait_type": "scarcity",
          "value": "Rare"
        },
        {
          "trait_type": "position",
          "value": "Midfielder"
        },
        {
          "trait_type": "jersey",
          "value": "away"
        },
      ],
      id: '6',
    },
    {
      name: "Paul Pogba",
      description: "",
      image: "",
      attributes: [
        {
          "trait_type": "team",
          "value": "Man United"
        },
        {
          "trait_type": "scarcity",
          "value": "Rare"
        },
        {
          "trait_type": "position",
          "value": "Midfielder"
        },
        {
          "trait_type": "jersey",
          "value": "home"
        },
      ],
      id: '7',
    },
    {
      name: "Antoinne Griezmann",
      description: "",
      image: "",
      attributes: [
        {
          "trait_type": "team",
          "value": "Barcelona"
        },
        {
          "trait_type": "scarcity",
          "value": "Normal"
        },
        {
          "trait_type": "position",
          "value": "Forward"
        },
        {
          "trait_type": "jersey",
          "value": "away"
        },
      ],
      id: '8',
    },
  ]
  console.log(playerCards[0].attributes[0].value)
  const renderCard = (p: any) => {
    return (
      <Grid item lg={3} key={p.id}>
        <NFTCard>
          <CardContent>
            <Typography>
              {p.name}
            </Typography>
            <Typography>
              {p.attributes[0].value}
            </Typography>
            <CardMedia sx={{
                height: 0,
                paddingTop: '56.7%',
              }}
              image={p.image}
              title={p.name + "'s Sorare card"}
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