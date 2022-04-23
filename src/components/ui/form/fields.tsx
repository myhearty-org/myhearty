import { Alert } from '@components/ui/alert';
import cn from 'classnames';
import { forwardRef, ReactElement, ReactNode, Ref, useId } from 'react';
import { FieldValues, FormProvider, SubmitHandler, useFormContext, UseFormReturn } from 'react-hook-form';
import { handleUnknownError } from 'utils/errors';
import { showToast } from 'utils/show-toast';

type InputProps = Omit<JSX.IntrinsicElements['input'], 'name'> & { name: string };

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(props, ref) {
  return (
    <input
      {...props}
      ref={ref}
      className={cn(
        'mt-2 block w-full rounded border border-gray-300 py-2 px-3 shadow-sm focus:border-pink-300 focus:outline-none focus:ring focus:ring-pink-300 sm:text-sm',
        props.className
      )}
    />
  );
});

type LabelProps = JSX.IntrinsicElements['label'];

export function Label(props: LabelProps) {
  return (
    <label {...props} className={cn('block text-sm font-medium text-gray-900', props.className)}>
      {props.children}
    </label>
  );
}

type InputLeadingProps = JSX.IntrinsicElements['label'];

export function InputLeading(props: InputLeadingProps) {
  return (
    <span className="inline-flex flex-shrink-0 items-center rounded-l-sm border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
      {props.children}
    </span>
  );
}

// prettier-ignore
type InputFieldProps = 
  { label?: ReactNode; labelProps?: React.ComponentProps<typeof Label>; } &
  { addOnLeading?: ReactNode } &
  React.ComponentProps<typeof Input>;

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(function InputField(props, ref) {
  const id = useId();
  const methods = useFormContext();
  const { label = props.name, labelProps, placeholder, className, addOnLeading, ...passThrough } = props;

  return (
    <div>
      {!!props.name && (
        <Label htmlFor={id} {...labelProps}>
          {label}
        </Label>
      )}
      {addOnLeading ? (
        <div className="mt-1 flex rounded-md shadow-sm">
          {addOnLeading}
          <Input
            id={id}
            placeholder={placeholder}
            className={cn(className, 'mt-0 rounded-l-none')}
            {...passThrough}
            ref={ref}
          />
        </div>
      ) : (
        <Input id={id} placeholder={placeholder} className={className} {...passThrough} ref={ref} />
      )}
      {methods?.formState?.errors[props.name] && (
        <Alert className="mt-1" severity="error" message={methods.formState.errors[props.name].message} />
      )}
    </div>
  );
});

export const TextField = forwardRef<HTMLInputElement, InputFieldProps>(function TextField(props, ref) {
  return <InputField ref={ref} {...props} />;
});

// prettier-ignore
export const PasswordField = forwardRef<HTMLInputElement, InputFieldProps>(function PasswordField(props, ref) {
  return <InputField type="password" ref={ref} {...props} />;
});

export const EmailField = forwardRef<HTMLInputElement, InputFieldProps>(function EmailField(props, ref) {
  return (
    <InputField
      ref={ref}
      type="email"
      autoCapitalize="none"
      autoComplete="email"
      autoCorrect="off"
      inputMode="email"
      {...props}
    />
  );
});

// prettier-ignore
type FormProps<T> = 
  { form: UseFormReturn<T>; handleSubmit: SubmitHandler<T> } & 
  Omit<JSX.IntrinsicElements['form'], 'onSubmit'>;

const PlainForm = <T extends FieldValues>(props: FormProps<T>, ref: Ref<HTMLFormElement>) => {
  const { form, handleSubmit, ...passThrough } = props;

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    try {
      await form.handleSubmit(handleSubmit)(event);
    } catch (error) {
      showToast(handleUnknownError(error).message, 'error');
    }
  }

  return (
    <FormProvider {...form}>
      <form ref={ref} onSubmit={onSubmit} {...passThrough}>
        {props.children}
      </form>
    </FormProvider>
  );
};

// prettier-ignore
export const Form = forwardRef(PlainForm) as 
  <T extends FieldValues>(p: FormProps<T> & { ref?: Ref<HTMLFormElement> }) => ReactElement;
