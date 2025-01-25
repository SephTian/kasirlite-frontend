import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Menu from '@/features/menu/components/menu';
import api from '@/lib/services/api';
import { QueryClient } from '@tanstack/react-query';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export const revalidate = 0; // No caching at all

export default async function MenuPage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  // ini akan te refresh jika param berubah pada link
  // PADA SERVER COMPONENT AKAN TERUS BERUBAH JIKA ADA DEPENDENCY DI LINK
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }

  // taking params from url
  const keywordParams = (searchParams?.keyword as string)?.toLowerCase() || '';
  const categoryParams = (searchParams?.category as string)?.toLowerCase() || '';
  const pageParams = Number(searchParams?.page) || 1;

  // setting up tanstack query
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['getMenus', keywordParams, categoryParams, pageParams],
    queryFn: () =>
      api.getMenus({
        params: {
          keyword: keywordParams,
          category: categoryParams,
          page: pageParams,
        },
        headers: {
          Authorization: `Bearer ${session.accessToken}`, // Token untuk otentikasi
        },
      }),
  });
  await queryClient.prefetchQuery({
    queryKey: ['getMenuCategories'],
    queryFn: () =>
      api.getMenuCategories({
        headers: {
          Authorization: `Bearer ${session.accessToken}`, // Token untuk otentikasi
        },
      }),
  });
  return (
    <div className="w-full p-4 sm:min-h-[calc(100vh-86px)] border rounded-lg bg-[#fdfdfd] space-y-6">
      <Menu />
    </div>
  );
}
