import { useAuth } from '@components/providers';
import { Button } from '@mantine/core';
import { Alert } from '@myhearty/ui/alert';
import { EmailInput, Form, PasswordInput } from '@myhearty/ui/form';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type LoginFormProps = {
  afterLogin?: () => void;
};

type LoginFormData = {
  email: string;
  password: string;
};

export function LoginForm({ afterLogin }: LoginFormProps) {
  const form = useForm<LoginFormData>();
  const { formState, register } = form;
  const [errorMessage, setErrorMessage] = useState<string>();

  const auth = useAuth();

  async function logIn({ email, password }: LoginFormData) {
    try {
      setErrorMessage('');

      await auth.logIn(email, password);
      afterLogin && afterLogin();
    } catch (error) {
      const errorMessage = error.response?.data?.error;

      if (!errorMessage) {
        throw error;
      }
      setErrorMessage(errorMessage);
    }
  }

  return (
    <Form className="flex flex-col gap-6" form={form} handleSubmit={logIn}>
      <EmailInput
        id="email"
        label="Email Address"
        defaultValue={process.env.NEXT_PUBLIC_DEMO_MODE === 'true' ? 'admin1@example.com' : ''}
        required
        {...register('email')}
      />
      <PasswordInput
        id="current-password"
        label="Password"
        defaultValue={process.env.NEXT_PUBLIC_DEMO_MODE === 'true' ? 'password' : ''}
        autoComplete="current-password"
        required
        {...register('password')}
      />
      {errorMessage && <Alert severity="error" title={errorMessage} />}
      <Button fullWidth type="submit" loading={formState.isSubmitting}>
        Log In
      </Button>
    </Form>
  );
}
