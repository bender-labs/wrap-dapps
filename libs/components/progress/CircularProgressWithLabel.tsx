import {Box, LinearProgress, LinearProgressProps} from '@material-ui/core';
import {ReactNode} from 'react';
import { black, shadeOfBlack } from '../theme/theme';

export function CircularProgressWithLabel(
  props: LinearProgressProps & { label: string | ReactNode }
) {

  return (
    <Box alignItems={'center'} sx={{width: '100%',}}>
      <Box width="100%" sx={{ backgroundColor: shadeOfBlack, padding: '20px 45px' }}>
        <LinearProgress
          color={'primary'}
          variant="determinate"
          {...props}
        />
      </Box>
      <Box
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        sx={{  paddingTop: '15px',color: black,}}
      >
        {props.label}
      </Box>
    </Box>
  );
}
