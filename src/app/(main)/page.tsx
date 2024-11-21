'use client';
import FormButton from '@/components/custom_ui/FormButton';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSession = () => {
    console.log(session);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="m-auto min-w-[100px] w-full max-w-[400px]  min-h-[80px] px-6 py-10 bg-white color rounded-lg shadow-lg mx-3">
        <p className="text-center font-medium mb-6">
          <span className="text-lg font-bold">KasirLite 1.0</span>
          <br />
          Selamat Datang
        </p>
        <Link href="/setting">tes</Link>
        <FormButton
          onClick={async () => {
            handleSession();
            // await signOut({ redirect: false });
            // router.push('/login');
          }}
          className="w-full bg-customOrange text-white px-3 py-2 font-bold mt-8 hover:bg-customDarkOrange"
        >
          logout
        </FormButton>
      </div>
    </div>
  );
}
