import { formatPriceToNumber } from '@/utils';
import { z } from 'zod';

export const receiptFormSchema = z
  .object({
    discount: z
      .string()
      .min(1, 'Diskon harus diisi')
      .refine((val) => formatPriceToNumber(val) >= 0, { message: 'Angka diskon tidak boleh dibawah 0' }),
    type: z.enum(['DIANTAR', 'DITEMPAT', 'DIBUNGKUS']),
    date: z.string({ required_error: 'Tanggal harus diisi' }).min(1, { message: 'Tanggal pesan harus diisi' }),
    hour: z.string({ required_error: 'Jam harus diisi' }).min(2, { message: 'Jam pesan harus diisi' }),
    minute: z.string({ required_error: 'Menit harus diisi' }).min(2, { message: 'Menit pesan harus diisi' }),
    paymentKind: z.string({ required_error: 'Jenis Pembayaran harus dipilih', invalid_type_error: 'Jenis Pembayaran harus dipilih' }),
    paymentType: z.string().nullable().optional(),
    customerName: z.string({ required_error: 'Nama harus diisi', invalid_type_error: 'Nama harus diisi' }).min(3, 'Nama minimal harus 3 digit'),
    note: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.paymentKind === 'N' && !data.paymentType) {
      ctx.addIssue({
        code: 'custom', // Kode error harus ada
        path: ['paymentType'], // Field yang terkena error
        message: 'Metode Pembayaran harus dipilih',
      });
    }
  });

export type ReceiptFormType = z.infer<typeof receiptFormSchema>;
