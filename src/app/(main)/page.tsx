'use client';
import Button from '@/components/ui/Button';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { data: session } = useSession();
  const router = useRouter();
  console.log(session);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="m-auto min-w-[100px] w-full max-w-[400px]  min-h-[80px] px-6 py-10 bg-white color rounded-lg shadow-lg mx-3">
        <p className="text-center font-medium mb-6">
          <span className="text-lg font-bold">KasirLite 1.0</span>
          <br />
          Selamat Datang
        </p>
        <Button
          onClick={async () => {
            await signOut({ redirect: false });
            router.push('/login');
          }}
          className="w-full bg-customOrange text-white px-3 py-2 font-bold mt-8 hover:bg-customDarkOrange"
        >
          logout
        </Button>
      </div>
    </div>
  );
}
