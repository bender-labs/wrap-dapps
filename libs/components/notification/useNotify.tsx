import { NotificationLevel, Notify } from './types';
import { useCallback } from 'react';
import { toast } from 'react-toastify';

export function useNotify() {
  const notify: Notify = (level, message) => {
    switch (level) {
      case NotificationLevel.ERROR:
        toast.error(message);
        break;
    }
  };
  return useCallback(notify, [toast]);
}
