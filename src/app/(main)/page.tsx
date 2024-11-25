'use client';
//import { useSession } from 'next-auth/react';
///import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div>
      <Link href="/order">order</Link>
    </div>
  );
}
