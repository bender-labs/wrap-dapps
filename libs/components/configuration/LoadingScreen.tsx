import React, { useEffect, useState } from 'react';
import {
  Backdrop,
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  styled
} from '@mui/material';

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: '#fff'
}));

type Props = {
  retryTime: number;
};

export function LoadingScreen({ retryTime }: Props) {
  const [time, setTime] = useState<number>(retryTime);

  useEffect(() => {
    setTime(retryTime - 1);
    const id = setInterval(() => {
      setTime((time) => {
        if (time > 1) return time - 1;
        else return 0;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [retryTime]);

  return (
    <StyledBackdrop open={true}>
      {retryTime > 0 ? (
        <Dialog open={true}>
          <Box sx={{ backgroundColor: 'white' }}>
            <DialogTitle>The Wrap Indexer is not available</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {time === 0 ? 'Retrying...' : `Retrying in ${time} seconds...`}
              </DialogContentText>
            </DialogContent>
          </Box>
        </Dialog>
      ) : (
        <CircularProgress color='inherit' />
      )}
    </StyledBackdrop>
  );
}
