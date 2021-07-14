import { Box, Typography } from '@material-ui/core';


export const DropDownCard = () => {
  return (
    <>
      <Box sx={{
        backgroundColor: 'red',
        display: 'flex',
      }}>
        <Typography>
          Drop Down Card
        </Typography>
      </Box>
    </>
  )
}

export const AmountToInputCard = () => {
  return (
    <>
        <Box sx={{
          display: 'flex',
          backgroundColor: 'white',
        }}>
          <Typography>
            Amount to input card
          </Typography>

      </Box>
    </>
  )
}

export const ReceiveCard = () => {
  return (
    <>
      <Box sx={{
        display: 'flex',
        backgroundColor: 'blue'
      }}>
        <Typography>
          Receive card
        </Typography>

      </Box>
    </>
  )
}

export const NextCard = () => {

}