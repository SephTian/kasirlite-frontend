import fetchAxios from '@/utils/axios';
import { LoginFormData } from '../types';

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

  async function getMenu({ ...option } = {}) {
    const {
      data: { data, status, message },
    } = await fetchAxios.get(`/api/menu`, { ...option });

    if (status !== 'ok') {
      throw new Error(message);
    }

    const { menu } = data;

    return menu;
  }
  return {
    login,
    getMenu,
  };
})();

export default api;
