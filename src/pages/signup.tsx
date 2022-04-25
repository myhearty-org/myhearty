import { Alert } from '@components/ui/alert';
import { Button } from '@components/ui/button';
import { EmailField, Form, PasswordField } from '@components/ui/form/fields';
import { useAuth } from '@hooks/use-auth';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type SignupFormData = {
  email: string;
  password: string;
};

function SignupForm() {
  const form = useForm<SignupFormData>();
  const { formState, register } = form;
  const [successMessage, setSuccessMessage] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const auth = useAuth();

  async function signUp({ email, password }: SignupFormData) {
    try {
      setSuccessMessage('');
      setErrorMessage('');

      await auth.signUp(email, password);
      setSuccessMessage('Your sign up was successful. Please check your email to verify your account.');
    } catch (error) {
      setErrorMessage('Email has already been taken.');
    }
  }

  return (
    <Form className="mt-8 space-y-6" form={form} handleSubmit={signUp}>
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
        {...register('password', {
          minLength: {
            value: 6,
            message: 'Password is too short (minimum is 6 characters)',
          },
        })}
      />
      {successMessage && <Alert severity="success" title={successMessage} />}
      {errorMessage && <Alert severity="error" title={errorMessage} />}
      <Button className="w-full justify-center" type="submit" loading={formState.isSubmitting}>
        Sign Up
      </Button>
    </Form>
  );
}

function LoginLink() {
  return (
    <Link href="/login" passHref>
      <p className="text-center text-sm text-gray-600">
        {'Already have an account? '}
        <a className="font-medium text-pink-600 hover:text-pink-400">Log in here.</a>
      </p>
    </Link>
  );
}

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm space-y-6 sm:max-w-md">
        <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
          Join us now.
          <br />
          Create a new account
        </h2>
        <SignupForm />
        <LoginLink />
      </div>
    </div>
  );
}
