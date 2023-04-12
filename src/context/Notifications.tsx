'use client';

import { Notification } from '@type-definitions/notifications';
import { createContext, Dispatch, ReactNode, useReducer } from 'react';

type AddNotificationAction = {
  type: 'ADD_NOTIFICATION';
  payload: Notification;
};

type RemoveNotificationAction = {
  type: 'REMOVE_NOTIFICATION';
  payload: string;
};

type NotificationsStoreAction = AddNotificationAction | RemoveNotificationAction;

type NotificationsStore = {
  notifications: Notification[];
  dispatch: Dispatch<NotificationsStoreAction>;
};

export const NotificationsContext = createContext<NotificationsStore>({
  notifications: [],
  dispatch: () => null,
});

const notificationsReducer = (notifications: Notification[], action: NotificationsStoreAction): Notification[] => {
  const { type, payload } = action;

  if (type === 'ADD_NOTIFICATION') {
    const newNotifications = [...notifications];
    newNotifications.unshift(payload);

    return newNotifications;
  }

  if (type === 'REMOVE_NOTIFICATION') {
    const newNotifications = [...notifications];

    const index = newNotifications.findIndex((notification) => notification.id === payload);

    if (index > -1) {
      newNotifications.splice(index, 1);
    }

    return newNotifications;
  }

  return [];
};

const NotificationsProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, dispatch] = useReducer(notificationsReducer, []);

  return <NotificationsContext.Provider value={{ notifications, dispatch }}>{children}</NotificationsContext.Provider>;
};

export default NotificationsProvider;
