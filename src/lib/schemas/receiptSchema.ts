import { formatPriceToNumber } from '@/utils';
import { z } from 'zod';

export const receiptFormSchema = z
  .object({
    discount: z
      .string()
      .min(1, 'Diskon harus diisi')
      .refine((val) => formatPriceToNumber(val) >= 0, { message: 'Angka diskon tidak boleh dibawah 0' }),
    type: z.string({ required_error: 'Tipe Order harus dipilih', invalid_type_error: 'Tipe Order harus dipilih' }),
    paymentKind: z.string({ required_error: 'Jenis Pembayaran harus dipilih', invalid_type_error: 'Jenis Pembayaran harus dipilih' }),
    paymentType: z.string().nullable().optional(),
    customerName: z.string({ required_error: 'Nama harus diisi', invalid_type_error: 'Nama harus diisi' }).min(3, 'Nama minimal harus 3 digit'),
    note: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.paymentKind === 'L' && !data.paymentType) {
      ctx.addIssue({
        code: 'custom', // Kode error harus ada
        path: ['paymentType'], // Field yang terkena error
        message: 'Metode Pembayaran harus dipilih',
      });
    }
  });

export type ReceiptFormType = z.infer<typeof receiptFormSchema>;
