import { Box, LinearProgress, LinearProgressProps, styled } from '@mui/material';
import { ReactNode } from 'react';

const LabelWrapper = styled(Box)(() => ({
  paddingTop: '15px',
  color: '#000000'
}));

const StyledLinearProgress = styled(LinearProgress)(() => ({
  barColorPrimary: {
    backgroundColor: '#F7CB16',
    opacity: '1',
    height: '8px',
    borderRadius: '12px',
  },
  barBackgroundColor: {
    backgroundColor: 'rgba(247,203,22,0.29)',
    height: '8px',
    borderRadius: '12px',
  }
}));

export function CircularProgressWithLabel(
  props: LinearProgressProps & { label: string | ReactNode }
) {
  return (
    <Box alignItems={'center'} sx={{ width: '100%' }}>
      <Box sx={{ backgroundColor: '#191919', padding: '20px 45px', width: '100%' }}>
        <StyledLinearProgress color={'primary'} variant='determinate' {...props} />
      </Box>
      <LabelWrapper alignItems='center' justifyContent='center' textAlign='center'>
        {props.label}
      </LabelWrapper>
    </Box>
  );
}
