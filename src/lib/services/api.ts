import fetchAxios from '@/utils/axios';
import { LoginFormData, OrderFormData } from '../types';

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

  async function getMenuTypes({ ...option }) {
    const {
      data: { data, status, message },
    } = await fetchAxios.get(`/api/menutypes`, { ...option });

    if (status !== 'ok') {
      throw new Error(message);
    }

    const { menuTypes } = data;

    return menuTypes;
  }

  async function addOrder({ menus, totalPrice, discount, customerName, note, type, paymentType, paymentKind, ...option }: OrderFormData) {
    console.log({
      menus: menus,
      totalPrice: totalPrice,
      discount: discount,
      customerName: customerName,
      note: note ?? '',
      type: type,
      paymentType: paymentType,
      paymentKind: paymentKind,
    });
    // const {
    //   data: { data, status, message },
    // } = await fetchAxios.post(
    //   `/api/menu`,
    //   {
    //     menus: menus,
    //     totalPrice: totalPrice,
    //     tax: tax,
    //     discount: discount,
    //     name: name,
    //     note: note,
    //     type: type,
    //     paymentType: paymentType,
    //   },
    //   { ...option }
    // );

    // if (status !== 'ok') {
    //   throw new Error(message);
    // }

    // const { Order } = data;

    // return Order;
  }
  return {
    login,
    getMenus,
    getMenuTypes,
    addOrder,
  };
})();

export default api;
