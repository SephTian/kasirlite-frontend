import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Order from '@/components/order-cart/order';
import api from '@/lib/services/api';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export const revalidate = 0; // No caching at all

export default async function OrderPage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  // ini akan te refresh jika param berubah pada link
  // PADA SERVER COMPONENT AKAN TERUS BERUBAH JIKA ADA DEPENDENCY DI LINK
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }

  const [menus, menuCategories] = await Promise.all([
    api.getMenus({
      params: {
        keyword: searchParams?.keyword || '',
        category: searchParams?.category || '',
      },
      headers: {
        Authorization: 'Bearer your_token_here', // Token untuk otentikasi
      },
    }),
    api.getMenuCategories({
      headers: {
        Authorization: 'Bearer your_token_here', // Token untuk otentikasi
      },
    }),
  ]);

  return (
    <div className="w-full p-4 sm:h-[calc(100vh-86px)] grid grid-cols-1 sm:grid-cols-6 border rounded-lg bg-[#fdfdfd] gap-3">
      <Order menuCategories={menuCategories} menus={menus} />
    </div>
  );
}
