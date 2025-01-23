import { Menu } from './menu';
import { Transaction } from './transaction';

export type TransactionDetail = {
  id: number | bigint;
  transactionId: Transaction['id'];
  menuId?: number | bigint | null;
  menu?: Menu | null;
  menuName: string;
  quantity: number;
  subPrice: number;
};
