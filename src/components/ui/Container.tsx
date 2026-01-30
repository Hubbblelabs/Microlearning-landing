import { HTMLAttributes, forwardRef } from 'react';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'default' | 'narrow' | 'wide';
  children: React.ReactNode;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ size = 'default', className = '', children, ...props }, ref) => {
    const baseStyles = 'w-full mx-auto px-6 md:px-8';
    
    const sizes = {
      default: 'max-w-[var(--container-max)]',
      narrow: 'max-w-4xl',
      wide: 'max-w-7xl',
    };

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';

export default Container;
