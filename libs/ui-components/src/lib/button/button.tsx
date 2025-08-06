import React from 'react';
import styles from './button.module.css';

export interface ButtonProps {
  /**
   * Button contents
   */
  children: React.ReactNode;
  /**
   * Optional click handler
   */
  onClick?: () => void;
  /**
   * Button variant
   */
  variant?: 'primary' | 'secondary' | 'danger';
  /**
   * Button size
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Optional additional className
   */
  className?: string;
  /**
   * Is button disabled
   */
  disabled?: boolean;
}

/**
 * Primary UI component for user interaction
 */
export function Button({
  children,
  variant = 'primary',
  size = 'medium',
  className = '',
  disabled = false,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;