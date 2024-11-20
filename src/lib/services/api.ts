import fetchAxios from '@/utils/axios';
import { LoginFormData } from '../types';

const api = (() => {
  async function login({ email, password }: LoginFormData) {
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
