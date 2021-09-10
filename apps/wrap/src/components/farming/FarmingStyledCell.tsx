import { styled } from '@mui/material';
import TableCell from '@mui/material/TableCell';

const FarmingStyledTableCell = styled(TableCell)(() =>
  ({
    fontSize: 14,
    padding: '20px',
    backgroundColor: 'white',
    textAlign: 'center',
    '&:first-child': {
      borderRadius: '20px 0 0 20px'
    },
    '&:last-child': {
      borderRadius: '0 20px 20px 0',
      padding: '0px 0px',
      flex: 2
    }
  })
);

export default FarmingStyledTableCell;