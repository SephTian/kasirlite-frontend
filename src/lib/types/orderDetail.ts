import { Menu } from './menu';
import { Order } from './order';

export type OrderDetail = {
  id: number;
  orderId: Pick<Order, 'id'>;
  menu?: Menu | null;
  menuName: string;
  quantity: number;
  subPrice: number;
};
