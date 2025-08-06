import React from 'react';
import styles from './card.module.css';

export interface CardProps {
  /**
   * Card contents
   */
  children: React.ReactNode;
  /**
   * Optional title
   */
  title?: string;
  /**
   * Optional additional className
   */
  className?: string;
  /**
   * Optional onClick handler
   */
  onClick?: () => void;
}

/**
 * Card component for displaying content in a contained box
 */
export function Card({
  children,
  title,
  className = '',
  ...props
}: CardProps) {
  return (
    <div className={`${styles.card} ${className}`} {...props}>
      {title && <div className={styles.cardHeader}>{title}</div>}
      <div className={styles.cardBody}>{children}</div>
    </div>
  );
}

export default Card;