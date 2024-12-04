'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFormSchema, LoginType } from '@/lib/schemas/loginSchema';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from '../custom-ui/button';
import LabelInput from '../custom-ui/label-input';
import { useToast } from '@/hooks/use-toast';

const LoginForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result?.error,
      });
      return;
    }
    toast({
      variant: 'constructive',
      title: 'Success',
      description: 'Anda berhasil masuk',
    });
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <div className="space-y-4">
        <div>
          <LabelInput {...register('email')} label="Email" type="email" placeholder="Email" isError={errors.email ? true : false} />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div className="space">
          <LabelInput {...register('password')} label="Password" type="password" placeholder="Password" isError={errors.password ? true : false} />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>
      </div>
      <Button disabled={isSubmitting} className="w-full bg-customOrange text-white px-3 py-2 font-bold mt-8 hover:bg-customDarkOrange">
        {isSubmitting ? 'Loading....' : 'Login'}
      </Button>
    </form>
  );
};

export default LoginForm;
