import { ButtonHTMLAttributes, forwardRef } from 'react';
import { motion } from 'framer-motion';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragStart' | 'onDragEnd'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, type = 'button', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-[var(--transition-base)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--ring-color)] disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
      primary: 'bg-[image:var(--gradient-cta)] text-white shadow-[var(--shadow-md),_0_0_20px_rgba(249,115,22,0.2)] hover:shadow-[var(--shadow-lg),_0_0_30px_rgba(249,115,22,0.3)] hover:-translate-y-0.5',
      secondary: 'bg-white text-slate-900 border-2 border-slate-200 hover:border-[var(--primary-500)] hover:text-[var(--primary-600)] hover:bg-[var(--primary-50)]',
      outline: 'bg-transparent text-white border border-white/30 backdrop-blur-md hover:bg-white/10 hover:border-white hover:-translate-y-0.5',
      ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900',
    };
    
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    return (
      <motion.button
        ref={ref}
        type={type}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...(props as any)}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
