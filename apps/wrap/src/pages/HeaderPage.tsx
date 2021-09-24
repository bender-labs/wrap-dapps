import React from 'react';
import { Box, styled, Typography } from '@mui/material';

const TitleBox = styled(Box)(({ theme }) => ({
  justifyItems: 'center',
  borderBottom: '3px solid #ffd000',
  marginBottom: theme.spacing(2),
  paddingBottom: theme.spacing(1)
}));

const TitleTypography = styled(Typography)(() => ({
  color: 'white',
  textAlign: 'center',
  fontSize: '30px'
}));

const SubtitleTypography = styled(Typography)(({ theme }) => ({
  color: 'white',
  textAlign: 'center',
  fontSize: '16px',
  fontWeight: 500
  // paddingTop: theme.spacing(1)
}));

export function HeaderPage({ title, subtitle }: { title: string, subtitle: string }) {
  return (
    <TitleBox>
      <TitleTypography>{title}</TitleTypography>
      <SubtitleTypography>{subtitle}</SubtitleTypography>
    </TitleBox>
  );
}