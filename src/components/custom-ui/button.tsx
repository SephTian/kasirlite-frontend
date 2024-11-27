'use client';
import React, { ButtonHTMLAttributes, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, className, onClick, ...props }: Props) {
  const handleClick = () => {
    onClick?.();
  };

  return (
    <button {...props} onClick={handleClick} className={`${className} text-center flex gap-2 items-center justify-center rounded-md`}>
      {children}
    </button>
  );
}
