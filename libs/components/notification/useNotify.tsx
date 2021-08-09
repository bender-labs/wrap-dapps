import { NotificationLevel, Notify } from './types';
import { useCallback } from 'react';
import { toast } from 'react-toastify';

export function useNotify() {
  const notify: Notify = (level, message) => {
    switch (level) {
      case NotificationLevel.ERROR:
        toast.error(message, {autoClose: 3000});
        break;
      case NotificationLevel.SUCCESS:
        toast.success(message, {autoClose: 3000});
        break;
    }
  };
  return useCallback(notify, [toast]);
}
