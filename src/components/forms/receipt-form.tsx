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
import LabelSelect from '../custom-ui/label-select';
import { MdPayments } from 'react-icons/md';
import LabelTextarea from '../custom-ui/label-textarea';

type Props = { totalPriceWithTax: number; totalPrice: number };

export default function ReceiptForm({ totalPrice, totalPriceWithTax }: Props) {
  const [afterDisountPrice, setAfterDisountPrice] = useState(0);
  const [afterDiscountError, setAfterDiscountError] = useState<string | null>(null);
  const { cart } = useSelector((state: RootState) => state.cart);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ReceiptFormType>({
    defaultValues: {
      discount: 0,
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
        paymentKind: data.paymentKind,
      });
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(handleAddTransaction)}>
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

      {/* Payment kind & Order type section */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div>
          <LabelSelect {...register('paymentKind')} label="Tipe Pembayaran" isError={errors.type ? true : false} isImportant>
            <option value="N">Bayar Nanti</option>
            <option value="L">Bayar Langsung</option>
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
      {watch('paymentKind') === 'L' && (
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
      <div>
        <LabelInput {...register('name')} label="Nama Pelanggan" type="text" placeholder="Nama Pelanggan..." isError={errors.name ? true : false} isImportant />
        {errors.name && <ErrorInputMessage>{errors.name.message}</ErrorInputMessage>}
      </div>

      {/* note section */}
      <div>
        <LabelTextarea {...register('note')} label="Catatan" isError={errors.note ? true : false} />
        {errors.note && <ErrorInputMessage>{errors.note.message}</ErrorInputMessage>}
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
