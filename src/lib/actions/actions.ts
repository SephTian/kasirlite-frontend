'use server';

import fetchAxios from '@/utils/axios';
import { LoginFormData } from '@/lib/types';

export async function loginAction({ email, password }: LoginFormData) {
  const response = await fetchAxios.post('/api/auth/login', { email, password });
  const { data, status, message } = response.data;

  if (status !== 'ok') {
    throw new Error(message);
  }

  return data.user;
}

export async function testquery({ type }: { type: string }) {
  console.log(type);
}
