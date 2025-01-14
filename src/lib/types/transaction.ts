import { MenuCart } from './menu';
import { TransactionDetail } from './transactionDetail';
import { Payment } from './payment';
import { User } from './user';

export type Transaction = {
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
  menus: TransactionDetail[]; // input dari pengguna
  payments: Payment[]; // dri BE
};

export type TransactionFormData = Pick<Transaction, 'discount' | 'totalPrice' | 'customerName' | 'type'> & {
  cart: {
    quantity: MenuCart['quantity'];
    menu: Pick<MenuCart['menu'], 'id' | 'name' | 'price'>;
  }[];
  note?: string | null;
  paymentType?: string | null; // input dari pengguna
  paymentKind: string;
};
