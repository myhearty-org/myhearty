import { Alert } from '@components/ui/alert';
import { Button } from '@components/ui/button';
import { EmailInput, Form, PasswordInput } from '@components/ui/form';
import { useAuth } from '@hooks/index';
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
      setErrorMessage(error.response.data.error);
    }
  }

  return (
    <Form className="flex flex-col gap-6" form={form} handleSubmit={logIn}>
      <EmailInput id="email" label="Email Address" required {...register('email')} />
      <PasswordInput
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
