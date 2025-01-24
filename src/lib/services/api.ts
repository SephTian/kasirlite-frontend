import fetchAxios from '@/utils/axios';
import { LoginFormData, TransactionFormData } from '../types';
import { AxiosError, AxiosRequestConfig } from 'axios';

const api = (() => {
  async function login({ email, password, ...option }: LoginFormData) {
    try {
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
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.message || 'error');
      }
    }
  }

  async function getMenus({ ...option }: AxiosRequestConfig) {
    try {
      const {
        data: { data, status, message },
      } = await fetchAxios.get(`/api/menus`, { ...option });

      if (status !== 'ok') {
        throw new Error(message);
      }

      const { menus } = data;

      return menus;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.message || 'error');
      }
    }
  }

  async function getMenuCategories({ ...option }: AxiosRequestConfig) {
    try {
      const {
        data: { data, status, message },
      } = await fetchAxios.get(`/api/menu-categories`, { ...option });

      if (status !== 'ok') {
        throw new Error(message);
      }

      const { menuCategories } = data;

      return menuCategories;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.message || 'error');
      }
    }
  }
  async function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function addTransaction({ cart, totalPrice, discount, customerName, note, type, paymentType, paymentKind }: TransactionFormData, option: AxiosRequestConfig) {
    try {
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

      const { transaction } = data;
      return transaction;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.message || 'error');
      }
    }

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
