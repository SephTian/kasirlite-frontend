'use client';

import { store } from '@/lib/states';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';

type Props = {
  children: ReactNode;
};

const Providers = ({ children }: Props) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <SessionProvider>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </SessionProvider>
      </Provider>
    </QueryClientProvider>
  );
};

export default Providers;
