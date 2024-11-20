'use client';
import fetchAxios from '@/utils/axios';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

function useAxiosClientWithToken() {
  const { data: session } = useSession();

  useEffect(() => {
    const requestIntercept = fetchAxios.interceptors.request.use(
      async (config) => {
        if (!config.headers['Authorization']) {
          config.headers.Authorization = `Bearer ${session?.user.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    return () => {
      fetchAxios.interceptors.request.eject(requestIntercept);
    };
  }, [session]);

  return fetchAxios;
}

export default useAxiosClientWithToken;
