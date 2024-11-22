'use client';
import ItemCard from '@/components/Item/ItemCard';
import ItemType from '@/components/Item/ItemType';
import FormButton from '@/components/custom_ui/FormButton';
import { Input } from '@/components/ui/input';
import { food, foodCart } from '@/lib/types';
//import { useSession } from 'next-auth/react';
///import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';

const fakeFoodData = [
  {
    id: '1',
    image: 'Fuyunghai',
    name: 'Fuyunghai',
    menuTypeId: '2',
    menuType: 'Makanan',
    hasAdditional: true,
    isAdditional: false,
    price: 10000,
    discount: 1000,
    disabled: false,
  },
  {
    id: '2',
    image: 'Telor Dadar',
    name: 'Telor Dadar',
    menuTypeId: '3',
    menuType: 'Tambahan',
    hasAdditional: true,
    isAdditional: true,
    price: 20000,
    discount: 1000,
    disabled: false,
  },
  {
    id: '3',
    image: 'Telor Mata Sapi',
    name: 'Telor Mata Sapi',
    menuTypeId: '3',
    menuType: 'Tambahan',
    hasAdditional: true,
    isAdditional: true,
    price: 30000,
    discount: 1000,
    disabled: true,
  },
  {
    id: '4',
    image: 'Ayam Krispi',
    name: 'Ayam Krispi',
    menuTypeId: '2',
    menuType: 'Makanan',
    hasAdditional: true,
    isAdditional: false,
    price: 40000,
    discount: 1000,
    disabled: false,
  },
];

export default function DashboardPage() {
  //const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const itemTypeParams = searchParams.get('type')?.toLowerCase() || '';
  const itemKeywordParams = searchParams.get('keyword')?.toLowerCase() || '';
  const [cart, setCart] = useState<foodCart[]>([]);

  // create search params
  const createSearchQuery = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(key, value);
      return params.toString();
    },
    [searchParams]
  );

  // Set keyword params on URL
  const handleKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    router.replace(`?${createSearchQuery('keyword', e.target.value)}`, { scroll: false });
  };

  const handleAddCart = (param: food) => {
    let isInCart = false;
    const currentCart = cart.map((item) => {
      // Checking if item in cart, so the quantity will be incremented
      if (item.food.id === param.id) {
        isInCart = true;
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    // If item not in cart then we add new item
    if (!isInCart) {
      const object: foodCart = {
        food: param,
        quantity: 1,
        additional: [],
      };
      setCart((prev) => [...prev, object]);
      return;
    }

    setCart(currentCart);
  };

  // Getting type from item data
  const itemTypes: string[] = useMemo(() => {
    return fakeFoodData?.reduce<string[]>((types, item) => {
      if (!types.includes(item.menuType)) {
        types.push(item.menuType);
      }
      return types;
    }, []);
  }, []);

  // Filtering item with type and keyword
  const filteredItem = fakeFoodData.filter((item) => {
    return item.menuType.toLowerCase().includes(itemTypeParams) && item.name.toLowerCase().includes(itemKeywordParams);
  });

  return (
    <div className="w-full min-h-[80vh] grid grid-cols-4 gap-6">
      {/* Items section */}
      <div className="col-span-3 space-y-4 p-6 rounded-md bg-white shadow-lg">
        <div className="rounded-md space-y-1 w-full overflow-x-scroll">
          <Input onChange={handleKeyword} value={itemKeywordParams} className="w-full border-2 border-customOrange bg-gray-100" type="text" placeholder="Cari makanan...." id="searchItem" />
        </div>
        <div className="space-y-4">
          <div className="flex gap-3">
            <Link href={`?${createSearchQuery('type', '')}`} replace>
              <ItemType isSelected={itemTypeParams === ''} type="Semua" />
            </Link>
            {itemTypes.map((item, key) => {
              const isSelected = item.toLocaleLowerCase() === itemTypeParams;
              return (
                <Link key={key} href={`?${createSearchQuery('type', itemTypeParams === item ? '' : item)}`} replace>
                  <ItemType isSelected={isSelected} type={item} />
                </Link>
              );
            })}
          </div>
          <h1 className="font-bold">Daftar makanan:</h1>
          <div className="grid grid-cols-5 gap-3">
            {filteredItem.map((item) => {
              return <ItemCard onClick={handleAddCart} key={item.id} {...item} />;
            })}
          </div>
        </div>
      </div>

      {/* Receipt section */}
      <div className="min-w-[100px] w-full px-6 py-10 bg-white border border-gray-200 rounded-lg shadow-lg">
        <p className="text-center font-medium mb-6">
          <span className="text-lg font-bold">KasirLite 1.0</span>
          <br />
          Selamat Datang
        </p>
        <Link href="/setting">tes</Link>
        <FormButton
          onClick={async () => {
            ///handleSession();
            // await signOut({ redirect: false });
            // router.push('/login');
          }}
          className="w-full bg-customOrange text-white px-3 py-2 font-bold mt-8 hover:bg-customDarkOrange"
        >
          logout
        </FormButton>
      </div>
    </div>
  );
}
