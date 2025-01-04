import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Order from '@/components/order-cart/order';
import api from '@/lib/services/api';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function OrderPage() {
  // ini akan te refresh jika param berubah pada link
  // PADA SERVER COMPONENT AKAN TERUS BERUBAH JIKA ADA DEPENDENCY DI LINK
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }

  const menu = await api.getMenu({ Authorization: `Bearer ${session?.user.accessToken}` });

  return (
    <div className="w-full p-4 sm:h-[calc(100vh-86px)] grid grid-cols-1 sm:grid-cols-6 shadow-lg border rounded-lg overflow-hidden bg-[#fdfdfd] gap-3">
      <Order menu={menu} />
    </div>
  );
}
