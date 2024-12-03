import Order from '@/components/order-cart/order';
import api from '@/lib/services/api';

export default async function OrderPage() {
  const menu = await api.getMenu();
  return (
    <div className="w-full min-h-[90vh] grid grid-cols-1 sm:grid-cols-6 gap-3">
      <Order menu={menu} />
    </div>
  );
}
