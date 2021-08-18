import { Box, LinearProgress, LinearProgressProps, styled } from '@material-ui/core';
import { ReactNode } from 'react';

const Root = styled(Box)(() => ({
  width: '100%'
}));

const ProgressWrapper = styled(Box)(() => ({
  backgroundColor: '#191919',
  padding: '20px 45px',
  width: '100%'
}));

const LabelWrapper = styled(Box)(() => ({
  paddingTop: '15px',
  color: '#000000'
}));

const StyledLinearProgress = styled(LinearProgress)(() => ({
  backgroundColor: '#F7CB16',
  opacity: '1',
  height: '8px',
  borderRadius: '12px'
}));


export function CircularProgressWithLabel(
  props: LinearProgressProps & { label: string | ReactNode }
) {
  return (
    <Root alignItems={'center'}>
      <ProgressWrapper>
        <StyledLinearProgress color={'primary'} variant='determinate' {...props} />
      </ProgressWrapper>
      <LabelWrapper alignItems='center' justifyContent='center' textAlign='center'>
        {props.label}
      </LabelWrapper>
    </Root>
  );
}
