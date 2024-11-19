import fetchAxios from '../axios';
import { LoginData } from '@/types';

const api = (() => {
  async function login({ email, password }: LoginData) {
    const API_DATA = {
      email,
      password,
    };
    const {
      data: { data, status, message },
    } = await fetchAxios.post(`/api/auth/login`, API_DATA);

    if (status !== 'ok') {
      throw new Error(message);
    }

    const { user } = data;

    return user;
  }
  return {
    login,
  };
})();

export default api;
