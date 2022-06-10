import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mantine/core';
import { signUpOrganization } from '@myhearty/lib/auth/organizations';
import { CreateOrganization, CreateOrganizationSchema } from '@myhearty/lib/types';
import {
  Checkbox,
  EmailInput,
  Form,
  PasswordInput,
  PhoneInput,
  TextArea,
  TextInput,
} from '@myhearty/ui/form';
import { showToast } from '@myhearty/utils/show-toast';
import remove from 'lodash/remove';
import { useForm } from 'react-hook-form';

type SignupFormData = CreateOrganization;

export function SignupForm() {
  const form = useForm<SignupFormData>({ resolver: zodResolver(CreateOrganizationSchema) });
  const {
    formState: { isSubmitting },
    register,
    setError,
  } = form;

  async function signUp(signupFormData: SignupFormData) {
    try {
      await signUpOrganization(signupFormData);
      showToast(
        'Your sign up was successful. Please check your email to verify your organization account.',
        'success'
      );
    } catch (error) {
      // TODO: Enhance the API to better handle error messages associated with fields that have the same name.
      const errors = error.response?.data?.errors;
      const adminEmailAlreadyExistsError = remove(
        errors,
        ({ resource, field, code }: any) =>
          resource === 'Member' && field === 'email' && code === 'alreadyExists'
      )[0];

      if (adminEmailAlreadyExistsError) {
        setError('admin.email', { message: 'Email already exists.' });
      }

      throw error;
    }
  }

  return (
    <Form form={form} handleSubmit={signUp}>
      <div className="flex flex-col gap-8">
        <div className="border border-gray-200 bg-white px-4 py-5 shadow-md sm:rounded-md sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Organization Information</h3>
              <p className="mt-1 text-sm text-gray-500">
                Please provide the information about your organization.
              </p>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-4">
                  <TextInput label="Name" required {...register('name')} />
                </div>
                <div className="col-span-6 sm:col-span-4">
                  <TextInput label="Location" required {...register('location')} />
                </div>
                <div className="col-span-6 sm:col-span-4">
                  <EmailInput label="Email address" required {...register('email')} />
                </div>
                <div className="col-span-6 sm:col-span-4">
                  <PhoneInput label="Contact number" required {...register('contactNo')} />
                </div>
                <div className="col-span-6 sm:col-span-4">
                  <TextInput label="Website" required {...register('websiteUrl')} />
                </div>
                <div className="col-span-6 sm:col-span-4">
                  <TextInput label="Name of person in charge" required {...register('personInChargeName')} />
                </div>
                <div className="col-span-6">
                  <TextArea
                    className="resize-none"
                    label="About Us"
                    rows={6}
                    required
                    {...register('aboutUs')}
                  />
                  <p className="mt-2 text-sm text-gray-500">Brief description for your organization.</p>
                </div>
                <div className="col-span-6">
                  <Checkbox
                    label="Charity"
                    description="Please check this box if your organization is a charity that plans to receive donations via fundraising campaigns."
                    {...register('charity')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border border-gray-200 bg-white px-4 py-5 shadow-md sm:rounded-md sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Admin Information</h3>
              <p className="mt-1 text-sm text-gray-500">
                Please fill in your user credentials to create an admin account.
              </p>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-4">
                  <EmailInput label="Email address" required {...register('admin.email')} />
                </div>
                <div className="col-span-6 sm:col-span-4">
                  <PasswordInput label="Password" required {...register('admin.password')} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit" loading={isSubmitting}>
            Sign Up
          </Button>
        </div>
      </div>
    </Form>
  );
}
