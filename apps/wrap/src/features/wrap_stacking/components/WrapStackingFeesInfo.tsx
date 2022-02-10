import React from 'react';
import { PaperContent } from '@wrap-dapps/components';
import { styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { IndexerWrapStackingFeesLevelsPayload } from '@wrap-dapps/api';

const StyledTableCell = styled(TableCell)(() => ({
  borderBottomColor: 'rgb(196,196,196)'
}));

export function WrapStackingFeesInfo({ fees }: { fees: IndexerWrapStackingFeesLevelsPayload | undefined }) {

  const getWeeks = (blockCount: number): number => {
    const OneWeekInBlocks = 20160;
    return blockCount / OneWeekInBlocks;
  };

  const duration = (blocks: number): string => {
    const weeks = getWeeks(blocks);
    return '< ' + Math.floor(weeks) + ' weeks';
  };

  const defaultDuration = (fees: IndexerWrapStackingFeesLevelsPayload): string => {
    const weeks = getWeeks(fees.levels[fees.levels.length - 1].blocksCount);
    return '>= ' + Math.floor(weeks) + ' weeks';
  };

  const defaultBlocksCount = (fees: IndexerWrapStackingFeesLevelsPayload): number => {
    return fees.levels[fees.levels.length - 1].blocksCount;
  };

  const defaultRatio = (fees: IndexerWrapStackingFeesLevelsPayload): string => {
    return '0';
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
            {fees?.levels.map((feeLevel) => (
              <TableRow
                key={'fee-level-' + feeLevel.cycle}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell align='center'>
                  {duration(feeLevel.blocksCount)}
                </StyledTableCell>
                <StyledTableCell align='center'>
                  {feeLevel.blocksCount}
                </StyledTableCell>
                <StyledTableCell align='center'>
                  {feeLevel.ratio === 0 ? 0 : 100 / feeLevel.ratio}%
                </StyledTableCell>
              </TableRow>
            ))}
            {fees?.levels &&
            <TableRow
              key={'fee-level-default'}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell align='center'>
                {defaultDuration(fees)}
              </StyledTableCell>
              <StyledTableCell align='center'>
                {defaultBlocksCount(fees)}
              </StyledTableCell>
              <StyledTableCell align='center'>
                {defaultRatio(fees)}%
              </StyledTableCell>
            </TableRow>
            }
          </TableBody>
        </Table>
      </TableContainer>
    </PaperContent>
  );
}
