import { Menu } from './menu';

export type OrderAdditional = {
  id: number;
  orderDetailId: number;
  menu: Menu;
  subPrice: number;
};
