import { Alert } from '@components/ui/alert';
import { Button } from '@components/ui/button';
import { EmailField, Form, PasswordField } from '@components/ui/form';
import { useAuth } from '@hooks/index';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type LoginFormData = {
  email: string;
  password: string;
};

export function LoginForm() {
  const form = useForm<LoginFormData>();
  const { formState, register } = form;
  const [errorMessage, setErrorMessage] = useState<string>();

  const auth = useAuth();

  async function logIn({ email, password }: LoginFormData) {
    try {
      setErrorMessage('');

      await auth.logIn(email, password);
    } catch (error) {
      setErrorMessage(error.response.data.error);
    }
  }

  return (
    <Form className="flex flex-col gap-6" form={form} handleSubmit={logIn}>
      <EmailField id="email" label="Email Address" required {...register('email')} />
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
