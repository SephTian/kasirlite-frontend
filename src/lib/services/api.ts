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

  async function addOrder({ menus, totalPrice, discount, name, note, type, paymentType, paymentKind, ...option }: OrderFormData) {
    console.log({
      menus: menus,
      totalPrice: totalPrice,
      discount: discount,
      name: name,
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
    getMenu,
    addOrder,
  };
})();

export default api;
