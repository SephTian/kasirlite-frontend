import fetchAxios from '@/utils/axios';
import { LoginFormData, TransactionFormData } from '../types';

const api = (() => {
  async function login({ email, password, ...option }: LoginFormData) {
    const API_DATA = {
      email,
      password,
    };
    const {
      data: { data, status, message },
    } = await fetchAxios.post(`/api/auth/login`, API_DATA, { ...option });

    if (status !== 'ok') {
      throw new Error(message);
    }

    const { user } = data;

    return user;
  }

  async function getMenus({ ...option }) {
    const {
      data: { data, status, message },
    } = await fetchAxios.get(`/api/menus`, { ...option });

    if (status !== 'ok') {
      throw new Error(message);
    }

    const { menus } = data;

    return menus;
  }

  async function getMenuCategories({ ...option }) {
    const {
      data: { data, status, message },
    } = await fetchAxios.get(`/api/menu-categories`, { ...option });

    if (status !== 'ok') {
      throw new Error(message);
    }

    const { menuCategories } = data;

    return menuCategories;
  }

  async function addTransaction({ cart, totalPrice, discount, customerName, note, type, paymentType, paymentKind, ...option }: TransactionFormData) {
    const {
      data: { data, status, message },
    } = await fetchAxios.post(
      `/api/transactions`,
      {
        cart: cart,
        totalPrice: totalPrice,
        discount: discount,
        customerName: customerName,
        note: note ?? '',
        type: type,
        paymentType: paymentType || null,
        paymentKind: paymentKind,
      },
      { ...option }
    );

    if (status !== 'ok') {
      throw new Error(message);
    }

    console.log(data, status, message);

    // return Order;
  }
  return {
    login,
    getMenus,
    getMenuCategories,
    addTransaction,
  };
})();

export default api;
