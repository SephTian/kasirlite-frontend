import { z } from 'zod';

export const receiptFormSchema = z.object({
  discount: z.coerce.number().min(0, 'Minimal 0 rupiah'),
  name: z.string().min(1, 'Nama minimal harus 1 digit'),
  note: z.string().optional(),
  type: z.string({ required_error: 'Tipe Order harus dipilih', invalid_type_error: 'Tipe Order harus dipilih' }),
  paymentType: z.string({ required_error: 'Metode Pembayaran harus dipilih', invalid_type_error: 'Payment harus dipilih' }),
});

export type ReceiptFormType = z.infer<typeof receiptFormSchema>;
