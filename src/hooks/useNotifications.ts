import { NotificationsContext } from '@context/Notifications';
import { Notification } from '@type-definitions/notifications';
import { nanoid } from 'nanoid';
import { useContext } from 'react';

const useNotifications = () => {
  const { notifications, dispatch } = useContext(NotificationsContext);

  const addNotification = (payload: Notification) => {
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        ...payload,
        id: nanoid(6),
      },
    });
  };

  const removeNotification = (payload: string) => {
    dispatch({
      type: 'REMOVE_NOTIFICATION',
      payload,
    });
  };

  return {
    notifications,
    addNotification,
    removeNotification,
  };
};

export default useNotifications;
