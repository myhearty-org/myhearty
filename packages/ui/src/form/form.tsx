import { handleRequest } from '@myhearty/utils/api';
import { i18n } from 'next-i18next';
import { forwardRef } from 'react';
import { FieldValues, FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form';

type FormComponentProps<T> = {
  form: UseFormReturn<T>;
  handleSubmit: SubmitHandler<T>;
} & Omit<JSX.IntrinsicElements['form'], 'onSubmit'>;

function FormComponent<T extends FieldValues>(props: FormComponentProps<T>, ref: React.Ref<HTMLFormElement>) {
  const { form, handleSubmit, children, ...passThrough } = props;

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      await form.handleSubmit(handleSubmit)(event);
    } catch (error) {
      const errors = error.response?.data?.errors;

      if (!errors) {
        throw error;
      }

      errors.map(({ field, code }: any) => {
        const errorField = i18n?.t([`fields.${field}`, 'fields.input'], { ns: 'validation' });
        const errorCodeMessage = i18n?.t([`codes.${code}`, 'codes.invalid'], { ns: 'validation' });

        form.setError(field, { message: `${errorField} ${errorCodeMessage}` });
      });
    }
  }

  return (
    <FormProvider {...form}>
      <form ref={ref} onSubmit={(event) => handleRequest(() => onSubmit(event))} {...passThrough}>
        {children}
      </form>
    </FormProvider>
  );
}

// prettier-ignore
export const Form = forwardRef(FormComponent) as 
  <T extends FieldValues>(p: FormComponentProps<T> & { ref?: React.Ref<HTMLFormElement> }) => React.ReactElement;
