'use client';
import React, { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
};

export default function FormButton({ children, className, onClick }: Props) {
  const handleClick = () => {
    onClick?.();
  };

  return (
    <button onClick={handleClick} className={`${className} text-center flex gap-2 items-center justify-center rounded-md`}>
      {children}
    </button>
  );
}
