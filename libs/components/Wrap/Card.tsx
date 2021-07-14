import { Box, Typography } from '@material-ui/core';

export const Card = () => {
  return (
    <>
      <Box sx={{
        backgroundColor: 'red'
      }}>
        <Typography>
          Inside card
        </Typography>
      </Box>
    </>
  )
}