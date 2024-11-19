import axios from 'axios';
//import { getSession } from 'next-auth/react';

const fetchAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3033',
});

// fetchAxios.interceptors.request.use(
//   async (config) => {
//     const session = await getSession();
//     if (session?.accessToken) {
//       config.headers.Authorization = `Bearer ${session.accessToken}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

export default fetchAxios;
