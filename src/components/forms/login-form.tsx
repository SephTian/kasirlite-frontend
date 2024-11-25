'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFormSchema, LoginType } from '@/lib/_schemas/loginSchema';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from '../custom-ui/button';

const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(loginFormSchema),
  });

  const handleLogin = async (data: LoginType) => {
    const { email, password } = data;

    const result = await signIn('credentials', {
      email: email,
      password: password,
      redirect: false,
    });
    if (!result?.ok) {
      console.error(result?.error);
      return;
    }
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm" htmlFor="email">
            Email
          </label>
          <input {...register('email')} className="w-full border py-2 px-2 rounded-md shadow-inner text-md" placeholder="Email" type="email" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div className="space">
          <label className="block text-sm" htmlFor="password">
            Password
          </label>
          <input {...register('password')} className="w-full border py-2 px-2 rounded-md shadow-inner text-md" placeholder="Password" type="password" />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>
      </div>
      <Button className="w-full bg-customOrange text-white px-3 py-2 font-bold mt-8 hover:bg-customDarkOrange">Login</Button>
    </form>
  );
};

export default LoginForm;
