import RestoreIcon from '@mui/icons-material/Restore';
import { Badge, IconButton } from '@mui/material';

export type OperationHistoryButtonProps = {
  count: number;
  onClick: () => void;
};

export default function OperationHistoryButton({ count, onClick }: OperationHistoryButtonProps) {
  return (
    <IconButton
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      color={'inherit'}
      sx={count === 0 ? {} : { color: '#DF318F' }}
    >
      <Badge badgeContent={count} color={'default'}>
        <RestoreIcon />
      </Badge>
    </IconButton>
  );
}
