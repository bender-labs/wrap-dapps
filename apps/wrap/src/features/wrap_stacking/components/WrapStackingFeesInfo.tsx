import React from 'react';
import { PaperContent } from '@wrap-dapps/components';
import { styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { IndexerWrapStackingFeesLevelsPayload } from '@wrap-dapps/api';

const StyledTableCell = styled(TableCell)(() => ({
  borderBottomColor: 'rgb(196,196,196)'
}));

export function WrapStackingFeesInfo({ fees }: { fees: IndexerWrapStackingFeesLevelsPayload | undefined }) {

  const duration = (blocks: number, index: number, last: number): string => {
    const OneWeekInBlocks = 20160;
    const weeks = blocks / OneWeekInBlocks + 1;
    const sign = index === last - 1 ? '>= ' : '< ';
    return sign + Math.floor(weeks) + ' weeks';
  };

  return (
    <PaperContent>
      <TableContainer component={'div'}>
        <Table size='small' aria-label='fees table'>
          <TableHead>
            <TableRow>
              <StyledTableCell component='th' align='center'>Stake duration</StyledTableCell>
              <StyledTableCell component='th' align='center'>Block count</StyledTableCell>
              <StyledTableCell component='th' align='center'>Withdrawal fee</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fees?.levels.map((feeLevel, feeLevelIndex) => (
              <TableRow
                key={'fee-level-' + feeLevel.cycle}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell align='center'>
                  {duration(feeLevel.blocksCount, feeLevelIndex, fees.levels.length)}
                </StyledTableCell>
                <StyledTableCell align='center'>
                  {feeLevel.blocksCount}
                </StyledTableCell>
                <StyledTableCell align='center'>
                  {100 / feeLevel.ratio}%
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PaperContent>
  );
}
