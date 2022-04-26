import { Alert } from '@components/ui/alert';
import { Button } from '@components/ui/button';
import { EmailField, Form, PasswordField } from '@components/ui/form/fields';
import { useAuth } from '@hooks/index';
import { getPathHistory } from '@utils/common';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type LoginFormData = {
  email: string;
  password: string;
};

function LoginForm() {
  const auth = useAuth();
  const router = useRouter();

  if (auth.isAuthenticated) {
    const [previousPath] = getPathHistory();
    previousPath === '' ? router.replace('/') : router.back();
  }

  const form = useForm<LoginFormData>();
  const { formState, register } = form;
  const [errorMessage, setErrorMessage] = useState<string>();

  async function logIn({ email, password }: LoginFormData) {
    try {
      setErrorMessage('');

      await auth.logIn(email, password);
      router.replace('/');
    } catch (error) {
      setErrorMessage(error.response.data.error);
    }
  }

  return (
    <Form className="mt-8 space-y-6" form={form} handleSubmit={logIn}>
      <EmailField 
        id="email" 
        label="Email Address" 
        required 
        {...register('email')} 
      />
      <PasswordField
        id="current-password"
        label="Password"
        autoComplete="current-password"
        required
        {...register('password')}
      />
      {errorMessage && <Alert severity="error" title={errorMessage} />}
      <Button className="w-full justify-center" type="submit" loading={formState.isSubmitting}>
        Log In
      </Button>
    </Form>
  );
}

function SignupLink() {
  return (
    <Link href="/signup" passHref>
      <p className="text-center text-sm text-gray-600">
        {"Don't have an account? "}
        <a className="font-medium text-pink-600 hover:text-pink-400">Sign up here.</a>
      </p>
    </Link>
  );
}

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm space-y-6 sm:max-w-md">
        <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
          Welcome.
          <br />
          Log in to your account
        </h2>
        <LoginForm />
        <SignupLink />
      </div>
    </div>
  );
}
