import { Menu, MenuCart } from './menu';
import { TransactionDetail } from './transactionDetail';
import { Payment } from './payment';
import { User } from './user';

export type Transaction = {
  id: number | bigint; // dri BE
  userId: number;
  cashier: Pick<User, 'id' | 'name'>; // dri BE
  status: string; // dri BE
  tax: number; // input dari pengguna
  discount: number; // input dari pengguna
  totalPrice: number; // input dari pengguna
  customerName: string; // input dari pengguna
  note?: string | null; // input dari pengguna
  type: 'DIBUNGKUS' | 'DIANTAR' | 'DITEMPAT'; // input dari pengguna
  date: string; // dri BE
  menus: TransactionDetail[]; // input dari pengguna
  payments: Payment[]; // dri BE
};

export type TransactionFormData = Pick<Transaction, 'discount' | 'totalPrice' | 'customerName' | 'type' | 'date'> & {
  cart: {
    menuId?: Menu['id'] | null;
    menuName: Menu['name'];
    quantity: MenuCart['quantity'];
    subPrice: MenuCart['subPrice'];
  }[];
  note?: string | null;
  paymentType?: string | null; // input dari pengguna
  paymentKind: string;
};
