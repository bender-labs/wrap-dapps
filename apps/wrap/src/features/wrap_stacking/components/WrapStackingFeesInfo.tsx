import React from 'react';
import { PaperContent } from '@wrap-dapps/components';
import { WrapStackingFees } from '../api/WrapStackingApi';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export function WrapStackingFeesInfo({ wrapStackingFees }: { wrapStackingFees: WrapStackingFees | undefined }) {

  return (
    <PaperContent alternate>
      <TableContainer component={Paper}>
        <Table size='small' aria-label='fees table'>
          <TableHead>
            <TableRow>
              <TableCell>Stake duration</TableCell>
              <TableCell align='right'>Fees</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {wrapStackingFees?.levels.map((fees) => (
              <TableRow
                key={fees.maxLevel}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {fees.maxLevel} blocks
                </TableCell>
                <TableCell align='right'>
                  {fees.feesPercent}%
                </TableCell>
              </TableRow>
            ))}
            {wrapStackingFees &&
            <TableRow
              key={0}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                0 blocks
              </TableCell>
              <TableCell align='right'>
                {wrapStackingFees.default}%
              </TableCell>
            </TableRow>}
          </TableBody>
        </Table>
      </TableContainer>
    </PaperContent>
  );
}
