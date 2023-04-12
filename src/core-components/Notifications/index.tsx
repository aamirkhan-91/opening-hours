'use client';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import useNotifications from '../../hooks/useNotifications';
import NotificationItem from './NotificationItem';

const Notifications: React.FC = () => {
  const { notifications } = useNotifications();

  return (
    <TransitionGroup className='absolute left-4 top-4 z-20 transform space-y-4'>
      {notifications.map((notification) => (
        <CSSTransition key={notification.id} timeout={300} classNames='notification'>
          <NotificationItem {...notification} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default Notifications;
