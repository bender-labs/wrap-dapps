import { Box, Card, Typography } from '@material-ui/core';


export const DropDownCard = () => {
  return (
    <Card>
      <Box sx={{
        backgroundColor: 'red',
        display: 'flex',
      }}>
        <Typography>
          Drop Down Card
        </Typography>
      </Box>
    </Card>
  )
}

export const AmountToInputCard = () => {
  return (
    <Card>
        <Box sx={{
          display: 'flex',
          backgroundColor: 'white',
        }}>
          <Typography>
            Amount to input card
          </Typography>

      </Box>
    </Card>
  )
}

export const ReceiveCard = () => {
  return (
    <Card>
      <Box sx={{
        display: 'flex',
        backgroundColor: 'blue'
      }}>
        <Typography>
          Receive card
        </Typography>

      </Box>
    </Card>
  )
}

export const NextCard = () => {

}