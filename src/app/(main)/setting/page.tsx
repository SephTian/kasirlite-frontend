import Link from 'next/link';
import React from 'react';

type Props = {};

function page({}: Props) {
  return (
    <div>
      <Link href="/">back</Link>
    </div>
  );
}

export default page;
