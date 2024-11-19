import React, { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  className?: string;
};

export default function Button({ children, className }: Props) {
  return <button className={`${className} text-center flex gap-2 items-center justify-center rounded-md`}>{children}</button>;
}
