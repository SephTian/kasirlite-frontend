import { Menu } from './menu';
import { Transaction } from './transaction';

export type TransactionDetail = {
  id: number;
  transactionId: Pick<Transaction, 'id'>;
  menu?: Menu | null;
  menuName: string;
  quantity: number;
  subPrice: number;
};
