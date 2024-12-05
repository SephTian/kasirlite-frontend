import React, { useEffect, useState } from 'react';
import LabelInput from '../custom-ui/label-input';
import Button from '../custom-ui/button';
import { useForm } from 'react-hook-form';

type Props = { totalPriceWithTax: number };

export default function ReceiptForm({ totalPriceWithTax }: Props) {
  const [afterDisountPrice, setAfterDisountPrice] = useState(0);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      discount: 0,
      name: '',
      note: '',
    },
  });

  // Calculating after discount price
  const discountInputValue = watch('discount');
  useEffect(() => {
    setAfterDisountPrice(totalPriceWithTax - discountInputValue);
  }, [totalPriceWithTax, discountInputValue]);

  // Handling adding transaction
  function handleAddTransaction() {
    console.log('berhasil');
  }
  return (
    <form className="space-y-4" onSubmit={handleSubmit(handleAddTransaction)}>
      <div className="grid lg:grid-cols-2 gap-4">
        <div>
          <LabelInput {...register('discount')} label="Diskon" type="number" placeholder="Diskon.." isError={false} />
          {errors.discount && <p>{errors.discount.message}</p>}
        </div>
        <div>
          <LabelInput readOnly label="Harga setelah diskon" placeholder="" type="number" value={afterDisountPrice} isError={false} />
        </div>
      </div>
      <div>
        <div>
          <LabelInput {...register('name')} label="Nama Pelanggan" type="text" placeholder="Nama" isError={false} />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div className="mt-4">
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
          {errors.note && <p>{errors.note.message}</p>}
        </div>
      </div>
      <div className="flex gap-4">
        <Button
          disabled={isSubmitting}
          onClick={() => {}}
          className="w-full bg-customOrange text-white px-3 py-2 font-semibold hover:bg-customDarkOrange disabled:bg-orange-300 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Loading...' : 'Bayar Sekarang'}
        </Button>
        <Button
          disabled={isSubmitting}
          onClick={() => {}}
          className="w-full bg-customOrange text-white px-3 py-2 font-semibold hover:bg-customDarkOrange disabled:bg-orange-300 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Loading...' : 'Bayar Nanti'}
        </Button>
      </div>
    </form>
  );
}
