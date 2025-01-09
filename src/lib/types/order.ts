import { MenuCart } from './menu';
import { OrderDetail } from './orderDetail';
import { Payment } from './payment';
import { User } from './user';

export type Order = {
  id: number; // dri BE
  cashier: Pick<User, 'id' | 'name'>; // dri BE
  status: string; // dri BE
  tax: number; // input dari pengguna
  discount: number; // input dari pengguna
  totalPrice: number; // input dari pengguna
  customerName: string; // input dari pengguna
  note: string; // input dari pengguna
  type: string; // input dari pengguna
  date: string; // dri BE
  menus: OrderDetail[]; // input dari pengguna
  payments: Payment[]; // dri BE
};

export type OrderFormData = Pick<Order, 'discount' | 'totalPrice' | 'customerName' | 'type'> & {
  menus: MenuCart[];
  note?: string | null;
  paymentType?: string | null; // input dari pengguna
  paymentKind: string;
};
