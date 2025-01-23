import { PaymentType } from './paymentType';

export type Payment = {
  id: number | bigint;
  transactionId: number | bigint;
  paymentTypeId: number | bigint;
  name: string;
  payment: number;
  paymentType: PaymentType;
  proof?: string | null;
  date: string;
};
