import { Card, CardProps, styled } from '@mui/material';

export const HalfCard = styled(Card)<CardProps>(({ theme }) => ({
  borderRadius: +theme.shape.borderRadius * 2,
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0
}));
