import React, { ChangeEvent, useEffect, useState } from 'react';

import Button from '@/components/custom-ui/button';
import { Controller, useForm } from 'react-hook-form';
import { receiptFormSchema, ReceiptFormType } from '@/lib/schemas/receiptSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorInputMessage from '@/components/custom-ui/error-input-message';
import api from '@/lib/services/api';
import { AppDispatch, RootState } from '@/lib/states';
import { useDispatch, useSelector } from 'react-redux';
import LabelSelect from '@/components/custom-ui/label-select';
import { MdPayments } from 'react-icons/md';
import LabelTextarea from '@/components/custom-ui/label-textarea';
import LabelRupiahInput from '@/components/custom-ui/label-rupiah-input';
import { formatPrice, formatPriceToNumber, formatNumberToPrice, formatRupiah } from '@/utils';
import { useToast } from '@/hooks/use-toast';
import { getSession } from 'next-auth/react';
import { unsetCart } from '@/lib/states/slices/cartSlice';
import LabelInput from '@/components/custom-ui/label-input';
import LabelMinute from '@/components/custom-ui/label-minute';
import LabelHour from '@/components/custom-ui/label-hour';
import LabelDate from '@/components/custom-ui/label-date';

type Props = { tax: number; totalPrice: number; closeModal: () => void };

export default function ReceiptForm({ totalPrice, tax, closeModal }: Props) {
  const { cart } = useSelector((state: RootState) => state.cart);
  const dispatch: AppDispatch = useDispatch();
  const { toast } = useToast();

  //untuk set after discount
  const [finalPrice, setFinalPrice] = useState(0);
  const [finalPriceError, setFinalPriceError] = useState<string | null>(null);
  const now = new Date();

  const {
    control,
    trigger,
    setValue,
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ReceiptFormType>({
    defaultValues: {
      discount: '0',
      date: now.toISOString().split('T')[0],
      hour: String(now.getHours()).padStart(2, '0'),
      minute: String(now.getMinutes()).padStart(2, '0'),
    },
    resolver: zodResolver(receiptFormSchema),
  });
  const TOTAL_TAX = totalPrice * tax;
  const TOTAL_PRICE_WITH_TAX = totalPrice + TOTAL_TAX;

  // Calculating after discount price
  const discountFormValue = watch('discount');
  useEffect(() => {
    const unformatedDiscount = formatPriceToNumber(discountFormValue === '' ? '0' : discountFormValue); // formatting dicount from 11.500 to 11500
    setFinalPrice(TOTAL_PRICE_WITH_TAX - unformatedDiscount);
    if (TOTAL_PRICE_WITH_TAX - unformatedDiscount < 0) {
      setFinalPriceError('Harga setelah diskon tidak boleh dibawah 0'); // make error if the price after discount below 0
      return;
    }
    setFinalPriceError(null);
  }, [TOTAL_PRICE_WITH_TAX, discountFormValue]);

  // Handling adding transaction
  async function handleAddTransaction(data: ReceiptFormType) {
    const session = await getSession();

    try {
      if (!finalPriceError) {
        const mappedCart = cart.map((item) => {
          return {
            menuId: item.menu.id || null,
            menuName: item.menu.name,
            quantity: item.quantity,
            subPrice: item.subPrice,
          };
        });

        const transaction = await api.addTransaction(
          {
            cart: mappedCart,
            discount: formatPriceToNumber(data.discount),
            customerName: data.customerName,
            note: data.note,
            date: `${data.date}T${data.hour}:${data.minute}:00`,
            totalPrice: totalPrice,
            type: data.type,
            paymentType: data.paymentType,
            paymentKind: data.paymentKind,
          },
          {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        );
        console.log(transaction);

        //@TODO buat close modal -- done
        closeModal();
        dispatch(unsetCart());

        //@TODO arahin ke halaman transaction id

        //@TODO ubah ke usemutation

        toast({
          variant: 'constructive',
          title: 'Success',
          description: 'Transaksi baru berhasil dibuat',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Failed',
        description: (error as Error).message,
      });
    }
  }

  //Make discount value always on preferable price format
  const handleDiscountChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setValue('discount', formatPrice(input));
    trigger('discount'); // trigger the validation schema
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(handleAddTransaction)}>
      {/* Discount section */}
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <LabelRupiahInput readOnly label="Harga" placeholder="" value={formatNumberToPrice(totalPrice)} isError={false} />
        </div>
        <div>
          <LabelRupiahInput readOnly label="Pajak" placeholder="" value={formatNumberToPrice(TOTAL_TAX)} isError={false} />
        </div>
        <div>
          <Controller
            control={control}
            name="discount"
            render={({ field }) => (
              <LabelRupiahInput label="Diskon" placeholder="Diskon.." {...field} onChange={handleDiscountChange} value={field.value || ''} isError={errors.discount ? true : false} />
            )}
          />
          {errors.discount && <ErrorInputMessage>{errors.discount.message}</ErrorInputMessage>}
        </div>
      </div>

      {/* Payment kind & Transaction type section */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <LabelSelect {...register('paymentKind')} label="Tipe Pembayaran" isError={errors.type ? true : false} isImportant>
            <option value="L">Bayar Nanti</option>
            <option value="N">Bayar Langsung</option>
          </LabelSelect>
          {errors.paymentKind && <ErrorInputMessage>{errors.paymentKind.message}</ErrorInputMessage>}
        </div>
        <div>
          <LabelSelect {...register('type')} label="Tipe Order" isError={errors.type ? true : false} isImportant>
            <option value="DITEMPAT">Ditempat</option>
            <option value="DIBUNGKUS">Dibungkus</option>
            <option value="DIANTAR">Diantar</option>
          </LabelSelect>
          {errors.type && <ErrorInputMessage>{errors.type.message}</ErrorInputMessage>}
        </div>
      </div>

      {/* admin must add payment kind if want to pay now */}
      {watch('paymentKind') === 'N' && (
        <div>
          <label className="block text-sm mb-1">Metode Pembayaran</label>
          <div className="flex flex-wrap gap-2">
            <div>
              <input {...register('paymentType')} className="peer hidden" id="payment1" type="radio" value="payment1" />
              <label className="cursor-pointer block py-2 px-4 text-xs font-semibold border-2 bg-white border-customOrange rounded-sm peer-checked:bg-customOrange" htmlFor="payment1">
                Payment1
              </label>
            </div>
            <div>
              <input {...register('paymentType')} className="peer hidden" id="payment2" type="radio" value="payment2" />
              <label className="cursor-pointer block py-2 px-4 text-xs font-semibold border-2 bg-white border-customOrange rounded-sm peer-checked:bg-customOrange" htmlFor="payment2">
                Payment2
              </label>
            </div>
          </div>
          {errors.paymentType && <ErrorInputMessage>{errors.paymentType.message}</ErrorInputMessage>}
        </div>
      )}

      {/* name section */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <LabelInput {...register('customerName')} label="Nama Pelanggan" type="text" placeholder="Nama Pelanggan..." isError={errors.customerName ? true : false} isImportant />
          {errors.customerName && <ErrorInputMessage>{errors.customerName.message}</ErrorInputMessage>}
        </div>
        <div>
          <div className="flex gap-2">
            <LabelDate className="flex-grow" {...register('date')} label="Tanggal pesan" isError={errors.date ? true : false} isImportant />
            <LabelHour {...register('hour')} label="Jam" isError={errors.hour ? true : false} isImportant />
            <LabelMinute {...register('minute')} label="Menit" isError={errors.minute ? true : false} isImportant />
          </div>
          {errors.date && <ErrorInputMessage>{errors.date.message}</ErrorInputMessage>}
          {errors.hour && <ErrorInputMessage>{errors.hour.message}</ErrorInputMessage>}
          {errors.minute && <ErrorInputMessage>{errors.minute.message}</ErrorInputMessage>}
        </div>
      </div>

      {/* note section */}
      <div>
        <LabelTextarea {...register('note')} label="Catatan" isError={errors.note ? true : false} />
        {errors.note && <ErrorInputMessage>{errors.note.message}</ErrorInputMessage>}
      </div>
      <div className="text-center space-y-3">
        <div className="bg-customOrange w-full rounded-md py-2 px-4 text-white shadow-lg">
          <div className="text-lg flex justify-between items-center">
            <p className="text-sm">Total Harga:</p>
            <p className="font-semibold">{formatRupiah(finalPrice)}</p>
          </div>
        </div>
        {finalPriceError && <ErrorInputMessage>{finalPriceError}</ErrorInputMessage>}
      </div>

      {/* button section */}
      <div className="flex gap-4">
        <Button disabled={isSubmitting} className="w-full bg-customOrange text-white px-3 py-2 font-semibold hover:bg-customDarkOrange disabled:bg-orange-300 disabled:cursor-not-allowed">
          {isSubmitting ? (
            'Loading...'
          ) : (
            <>
              <MdPayments />
              Bayar
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
