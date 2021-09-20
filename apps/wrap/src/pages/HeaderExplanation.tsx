import { Box, styled } from '@mui/material';

export const HeaderExplanation = styled(Box)(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(3),
  backgroundColor: 'rgb(229, 246, 253)',
  justifyContent: 'center',
  borderRadius: theme.spacing(0.5),
  padding: theme.spacing(1)
}));