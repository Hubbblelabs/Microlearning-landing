import { HTMLAttributes, forwardRef } from 'react';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ spacing = 'lg', className = '', children, ...props }, ref) => {
    const spacings = {
      none: '',
      sm: 'py-12',
      md: 'py-16 md:py-20',
      lg: 'py-20 md:py-28',
      xl: 'py-24 md:py-32',
    };

    return (
      <section
        ref={ref}
        className={`${spacings[spacing]} ${className}`}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = 'Section';

export default Section;
