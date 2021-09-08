import { styled } from '@mui/material';
import TableRow from '@mui/material/TableRow';

const FarmingStyledTableRow = styled(TableRow)(() =>
  ({
    root: {
      margin: '50px',

      border: '2px solid red'
    }
  })
);

export default FarmingStyledTableRow;