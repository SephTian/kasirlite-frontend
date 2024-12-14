import React, { useEffect, useState } from 'react';
import LabelInput from '../custom-ui/label-input';
import Button from '../custom-ui/button';
import { useForm } from 'react-hook-form';
import { receiptFormSchema, ReceiptFormType } from '@/lib/schemas/receiptSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorInputMessage from '../custom-ui/error-input-message';
import api from '@/lib/services/api';
import { RootState } from '@/lib/states';
import { useSelector } from 'react-redux';

type Props = { totalPriceWithTax: number; totalPrice: number };

export default function ReceiptForm({ totalPrice, totalPriceWithTax }: Props) {
  const [afterDisountPrice, setAfterDisountPrice] = useState(0);
  const [afterDiscountError, setAfterDiscountError] = useState<string | null>(null);
  const [paymentKind, setPaymentKind] = useState<'now' | 'later'>('now');
  const { cart } = useSelector((state: RootState) => state.cart);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ReceiptFormType>({
    defaultValues: {
      discount: 0,
      type: 'DIBUNGKUS',
      name: '',
      note: '',
    },
    resolver: zodResolver(receiptFormSchema),
  });

  // Calculating after discount price
  const discountValue = watch('discount');
  useEffect(() => {
    setAfterDisountPrice(totalPriceWithTax - discountValue);

    // make error if the price after discount below 0
    if (totalPriceWithTax - discountValue < 0) {
      setAfterDiscountError('Harga setelah diskon tidak boleh 0');
      return;
    }
    setAfterDiscountError(null);
  }, [totalPriceWithTax, discountValue]);

  // Handling adding transaction
  async function handleAddTransaction(data: ReceiptFormType) {
    if (afterDisountPrice > 0) {
      await api.addOrder({
        menus: cart,
        discount: data.discount,
        name: data.name,
        note: data.note,
        totalPrice: totalPrice,
        type: data.type,
        paymentType: data.paymentType,
        paymentKind,
      });
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(handleAddTransaction)}>
      {/* name section */}
      <div>
        <LabelInput {...register('name')} label="Nama Pelanggan" type="text" placeholder="Nama Pelanggan..." isError={errors.name ? true : false} />
        {errors.name && <ErrorInputMessage>{errors.name.message}</ErrorInputMessage>}
      </div>

      {/* Discount section */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div>
          <LabelInput {...register('discount')} label="Diskon" type="number" placeholder="Diskon.." isError={errors.discount ? true : false} />
          {errors.discount && <ErrorInputMessage>{errors.discount.message}</ErrorInputMessage>}
        </div>
        <div>
          <LabelInput readOnly label="Harga setelah diskon" placeholder="" type="number" value={afterDisountPrice} isError={afterDiscountError ? true : false} />
          {afterDiscountError && <ErrorInputMessage>{afterDiscountError}</ErrorInputMessage>}
        </div>
      </div>

      {/* Payment type section */}
      <div>
        <label className="block text-sm mb-1">Metode Pembayaran</label>
        <div className="flex flex-wrap gap-2">
          <div>
            <input {...register('paymentType')} className="peer hidden" id="payment1" type="radio" value="payment1" />
            <label className="cursor-pointer block py-2 px-4 text-sm font-semibold border-2 bg-white border-customOrange rounded-sm peer-checked:bg-customOrange" htmlFor="payment1">
              Payment1
            </label>
          </div>
          <div>
            <input {...register('paymentType')} className="peer hidden" id="payment2" type="radio" value="payment2" />
            <label className="cursor-pointer block py-2 px-4 text-sm font-semibold border-2 bg-white border-customOrange rounded-sm peer-checked:bg-customOrange" htmlFor="payment2">
              Payment2
            </label>
          </div>
        </div>
        {errors.paymentType && <ErrorInputMessage>{errors.paymentType.message}</ErrorInputMessage>}
      </div>

      {/* Order type section */}
      <div>
        <label className="block text-sm mb-1">Tipe Order</label>
        <div className="flex flex-wrap gap-2">
          <div>
            <input {...register('type')} className="peer hidden" id="type2" type="radio" value="DIBUNGKUS" />
            <label className="cursor-pointer block py-2 px-4 text-sm font-semibold border-2 bg-white border-customOrange rounded-sm peer-checked:bg-customOrange" htmlFor="type2">
              Dibungkus
            </label>
          </div>
          <div>
            <input {...register('type')} className="peer hidden" id="type1" type="radio" value="DITEMPAT" />
            <label className="cursor-pointer block py-2 px-4 text-sm font-semibold border-2 bg-white border-customOrange rounded-sm peer-checked:bg-customOrange" htmlFor="type1">
              Ditempat
            </label>
          </div>
        </div>
        {errors.type && <ErrorInputMessage>{errors.type.message}</ErrorInputMessage>}
      </div>

      {/* note section */}
      <div>
        <label htmlFor="note" className="block text-sm mb-1">
          Catatan
        </label>
        <textarea
          {...register('note')}
          id="note"
          rows={4}
          cols={50}
          className={`border-2 border-customOrange w-full bg-white rounded-md shadow-inner text-md focus-visible:ring-0 focus-visible:outline-none p-2`}
        ></textarea>
        {errors.note && <ErrorInputMessage>{errors.note.message}</ErrorInputMessage>}
      </div>

      {/* button section */}
      <div className="flex gap-4">
        <Button
          disabled={isSubmitting}
          onClick={() => setPaymentKind('now')}
          className="w-full bg-customOrange text-white px-3 py-2 font-semibold hover:bg-customDarkOrange disabled:bg-orange-300 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Loading...' : 'Bayar Sekarang'}
        </Button>
        <Button
          disabled={isSubmitting}
          onClick={() => setPaymentKind('later')}
          className="w-full bg-customOrange text-white px-3 py-2 font-semibold hover:bg-customDarkOrange disabled:bg-orange-300 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Loading...' : 'Bayar Nanti'}
        </Button>
      </div>
    </form>
  );
}
