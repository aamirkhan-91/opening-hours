import LoadingIcon from '@icons/Loading';
import { cva, VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

const button = cva(
  'font-medium justify-center shadow-md tracking-wide flex items-center space-x-1 transition hover:-translate-y-[2px] active:translate-y-[1px] rounded-md text-base px-3 py-2',
  {
    variants: {
      variant: {
        primary: ['bg-green text-white'],
        danger: ['bg-red text-white'],
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button> & {
    fullWidth?: boolean;
    className?: string;
    children: React.ReactNode;
    loading?: boolean;
  };

const Button: React.FC<ButtonProps> = ({
  variant,
  children,
  className,
  loading = false,
  fullWidth = false,
  ...props
}) => {
  return (
    <button
      className={clsx(button({ variant, className }), {
        'w-full': fullWidth,
      })}
      {...props}
    >
      {loading ? <LoadingIcon height={24} width={24} className='animate-spin' /> : children}
    </button>
  );
};

export default Button;
