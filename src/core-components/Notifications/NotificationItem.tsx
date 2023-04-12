import Typography from '@core-components/Typography';
import useNotifications from '@hooks/useNotifications';
import CrossIcon from '@icons/Cross';
import { Notification } from '@type-definitions/notifications';
import { cva, VariantProps } from 'class-variance-authority';
import { useEffect, useRef } from 'react';

const notification = cva('relative w-[300px] rounded-lg text-white opacity-90 p-3 shadow-lg', {
  variants: {
    variant: {
      success: ['bg-green'],
      error: ['bg-red'],
      info: ['bg-blue'],
    },
  },
  defaultVariants: {
    variant: 'success',
  },
});

type Props = VariantProps<typeof notification> & Notification;

const NotificationItem: React.FC<Props> = ({ variant, id, message, title, duration = 2000, persistent = false }) => {
  const { removeNotification } = useNotifications();

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const dismiss = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    removeNotification(id as string);
  };

  useEffect(() => {
    if (!persistent) {
      timeoutRef.current = setTimeout(dismiss, duration);
    }
  }, []);

  return (
    <li className={notification({ variant })}>
      <button className='absolute right-2 top-2' onClick={dismiss}>
        <CrossIcon width={20} height={20} />
      </button>
      <Typography size='base' weight='bold'>
        {title}
      </Typography>
      <Typography size='sm'>{message}</Typography>
    </li>
  );
};

export default NotificationItem;
