import { MenuCart } from './menu';

export type TransactionFormData = Pick<Transaction, 'menus' | 'discount' | 'tax' | 'totalPrice' | 'name' | 'note'> & {
  paymentType: string; // input dari pengguna
};

export type Transaction = {
  id: number; // dri BE
  cashierName: string; // dri BE
  status: string; // dri BE
  tax: number; // input dari pengguna
  discount: number; // input dari pengguna
  totalPrice: number; // input dari pengguna
  name: string; // input dari pengguna
  note: string; // input dari pengguna
  date: string; // dri BE
  menus: MenuCart[]; // input dari pengguna
  payments: payment[]; // dri BE
};

export type payment = {
  id: number;
  name: string;
  payment: number;
  proof: string;
  date: string;
  tax: number;
};
