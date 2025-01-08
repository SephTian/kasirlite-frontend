import { PaymentType } from './paymentType';

export type Payment = {
  id: number;
  name: string;
  payment: number;
  paymentType: PaymentType;
  proof: string;
  date: string;
};
