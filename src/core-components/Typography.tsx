import { cva, VariantProps } from 'class-variance-authority';

const typography = cva('font-sans', {
  variants: {
    variant: {
      sm: ['text-sm font-bold'],
      'body-regular': ['text-base font-normal'],
      'body-medium': ['text-base font-medium'],
      lg: ['text-lg font-bold'],
    },
    color: {
      black: ['text-black'],
      green: ['text-green'],
      white: ['text-white'],
      grey: ['text-grey-3'],
    },
  },
  defaultVariants: {
    variant: 'body-regular',
    color: 'black',
  },
});

type TypographyProps = VariantProps<typeof typography> & {
  className?: string;
  children: React.ReactNode;
};

const Typography: React.FC<TypographyProps> = ({ variant, color, children, className, ...props }) => {
  if (variant === 'lg') {
    return (
      <h3 className={typography({ variant, color, className })} {...props}>
        {children}
      </h3>
    );
  } else {
    return (
      <p className={typography({ variant, color, className })} {...props}>
        {children}
      </p>
    );
  }
};

export default Typography;
