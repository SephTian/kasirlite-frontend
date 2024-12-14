import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function ErrorInputMessage({ children }: Props) {
  return <div className="text-sm text-red-600">{children}</div>;
}
