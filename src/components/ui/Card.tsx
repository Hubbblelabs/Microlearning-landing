import { HTMLAttributes, forwardRef } from 'react';
import { motion } from 'framer-motion';

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragStart' | 'onDragEnd'> {
  variant?: 'default' | 'elevated' | 'outlined' | 'ghost';
  hover?: boolean;
  children: React.ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', hover = true, className = '', children, ...props }, ref) => {
    const baseStyles = 'rounded-[var(--radius-xl)] p-6 transition-all duration-[var(--transition-base)]';
    
    const variants = {
      default: 'bg-white border border-[var(--border)]',
      elevated: 'bg-white shadow-[var(--shadow-md)]',
      outlined: 'bg-transparent border-2 border-[var(--border)]',
      ghost: 'bg-slate-50',
    };
    
    const hoverStyles = hover ? 'hover:-translate-y-1 hover:shadow-[var(--shadow-xl)] hover:border-[var(--primary-200)]' : '';

    return (
      <motion.div
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${className}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
        {...(props as any)}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
