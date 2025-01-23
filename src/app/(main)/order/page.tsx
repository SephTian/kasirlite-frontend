import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Order from '@/components/order-cart/order';
import api from '@/lib/services/api';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
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

  // taking params from url
  const keywordParams = searchParams?.keyword || '';
  const categoryParams = searchParams?.category || '';

  // setting up tanstack query
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['menus', keywordParams, categoryParams],
    queryFn: () =>
      api.getMenus({
        params: {
          keyword: keywordParams,
          category: categoryParams,
        },
        headers: {
          Authorization: `Bearer ${session.accessToken}`, // Token untuk otentikasi
        },
      }),
  });
  await queryClient.prefetchQuery({
    queryKey: ['menuCategories'],
    queryFn: () =>
      api.getMenuCategories({
        headers: {
          Authorization: `Bearer ${session.accessToken}`, // Token untuk otentikasi
        },
      }),
  });

  return (
    <div className="w-full p-4 sm:h-[calc(100vh-86px)] grid grid-cols-1 sm:grid-cols-6 border rounded-lg bg-[#fdfdfd] gap-3">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Order />
      </HydrationBoundary>
    </div>
  );
}
