import { useAuth } from '@components/providers';
import { Button } from '@mantine/core';
import { Alert } from '@myhearty/ui/alert';
import { EmailInput, Form, PasswordInput } from '@myhearty/ui/form';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type SignupFormData = {
  email: string;
  password: string;
};

export function SignupForm() {
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
    <Form className="flex flex-col gap-6" form={form} handleSubmit={signUp}>
      <EmailInput id="email" label="Email Address" required {...register('email')} />
      <PasswordInput
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
      <Button
        fullWidth
        type="submit"
        disabled={process.env.NEXT_PUBLIC_DEMO_MODE === 'true'}
        loading={formState.isSubmitting}>
        Sign Up
      </Button>
    </Form>
  );
}
