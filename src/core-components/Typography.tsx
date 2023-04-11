import { cva, VariantProps } from 'class-variance-authority';

const typography = cva('font-sans transition-colors', {
  variants: {
    size: {
      xs: ['text-xs '],
      sm: ['text-sm'],
      base: ['text-base'],
      lg: ['text-lg'],
      xl: ['text-lg md:text-xl'],
    },
    weight: {
      normal: ['font-normal'],
      medium: ['font-medium'],
      bold: ['font-bold'],
    },
  },
  defaultVariants: {
    size: 'base',
  },
});

type TypographyProps = VariantProps<typeof typography> & {
  className?: string;
  children: React.ReactNode;
};

const Typography: React.FC<TypographyProps> = ({ size, weight, children, className, ...props }) => {
  if (size === 'xl') {
    return (
      <h1 className={typography({ size, weight, className })} {...props}>
        {children}
      </h1>
    );
  } else if (size === 'lg') {
    return (
      <h3 className={typography({ size, weight, className })} {...props}>
        {children}
      </h3>
    );
  } else {
    return (
      <p className={typography({ size, weight, className })} {...props}>
        {children}
      </p>
    );
  }
};

export default Typography;
