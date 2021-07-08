import { useSnackbar } from 'notistack';
import { Notify } from './types';
import { useCallback, useMemo } from 'react';

export function useNotify() {
  const { enqueueSnackbar } = useSnackbar();
  const notify: Notify = (level, message) => {
    enqueueSnackbar(message, { variant: 'error' });
  };
  return useCallback(notify, [enqueueSnackbar]);
}
