'use client';
import { useSession } from 'next-auth/react';

export default function DashboardPage() {
  const asdasd = useSession();
  console.log(asdasd);
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="m-auto min-w-[100px] w-full max-w-[400px]  min-h-[80px] px-6 py-10 bg-white color rounded-lg shadow-lg mx-3">
        <p className="text-center font-medium mb-6">
          <span className="text-lg font-bold">KasirLite 1.0</span>
          <br />
          Selamat Datang
        </p>
      </div>
    </div>
  );
}
