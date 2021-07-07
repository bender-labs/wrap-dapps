import { useSnackbar } from 'notistack';
import { Notify } from './types';

export function useNotify() {
  const { enqueueSnackbar } = useSnackbar();
  const notify: Notify = (level, message) => {
    enqueueSnackbar(message, { variant: 'error' });
  };
  return notify;
}
