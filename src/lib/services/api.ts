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

  async function getMenu({ ...option }) {
    const {
      data: { data, status, message },
    } = await fetchAxios.get(`/api/menu`, { ...option });

    if (status !== 'ok') {
      throw new Error(message);
    }

    const { menu } = data;

    return menu;
  }

  async function addTransaction({ menus, totalPrice, tax, discount, name, note, paymentType, ...option }: TransactionFormData) {
    const {
      data: { data, status, message },
    } = await fetchAxios.post(
      `/api/menu`,
      {
        menus: menus,
        totalPrice: totalPrice,
        tax: tax,
        discount: discount,
        name: name,
        note: note,
        paymentType: paymentType,
      },
      { ...option }
    );

    if (status !== 'ok') {
      throw new Error(message);
    }

    const { transaction } = data;

    return transaction;
  }
  return {
    login,
    getMenu,
    addTransaction,
  };
})();

export default api;
