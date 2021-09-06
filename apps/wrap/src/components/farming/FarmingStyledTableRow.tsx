import { styled } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';

const FarmingStyledTableRow = styled(TableRow)(() =>
  ({
    root: {
      margin: '50px',

      border: '2px solid red'
    }
  })
);

export default FarmingStyledTableRow;