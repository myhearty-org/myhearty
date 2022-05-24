import { Alert } from '@components/ui/alert';
import { handleRequest } from '@utils/api';
import cn from 'classnames';
import { i18n } from 'next-i18next';
import { forwardRef, useId, useState } from 'react';
import { FieldValues, FormProvider, SubmitHandler, useFormContext, UseFormReturn } from 'react-hook-form';

type InputProps = Omit<JSX.IntrinsicElements['input'], 'name'> & { name: string };

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ className, ...props }, ref) {
  return (
    <input
      className={cn(
        'mt-2 block w-full rounded border border-gray-300 py-2 px-3 shadow-sm focus:border-pink-300 focus:outline-none focus:ring focus:ring-pink-300 sm:text-sm',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

type LabelProps = JSX.IntrinsicElements['label'];

export function Label({ className, children, ...props }: LabelProps) {
  return (
    <label className={cn('block text-sm font-medium text-gray-900', className)} {...props}>
      {children}
    </label>
  );
}

type InputLeadingProps = {
  children: React.ReactNode;
};

export function InputLeading({ children }: InputLeadingProps) {
  return (
    <span className="inline-flex flex-shrink-0 items-center rounded-l border border-r-0 border-gray-300 bg-gray-50 px-3 py-2 text-gray-600 shadow-sm sm:text-sm">
      {children}
    </span>
  );
}

// prettier-ignore
type InputFieldProps = 
  { label?: React.ReactNode; labelProps?: React.ComponentProps<typeof Label>; } &
  { addOnLeading?: React.ReactNode } &
  { visible?: boolean; } &
  React.ComponentProps<typeof Input>;

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(function InputField(props, ref) {
  const id = useId();
  const methods = useFormContext();
  const {
    label = props.name,
    labelProps,
    placeholder,
    className,
    addOnLeading,
    visible = true,
    ...passThrough
  } = props;

  return (
    <div className={cn(!visible && 'invisible')}>
      {!!props.name && (
        <Label htmlFor={id} {...labelProps}>
          {label}
        </Label>
      )}
      {addOnLeading ? (
        <div className="mt-2 flex">
          {addOnLeading}
          <Input
            className={cn(className, 'mt-0 rounded-l-none')}
            id={id}
            placeholder={placeholder}
            {...passThrough}
            ref={ref}
          />
        </div>
      ) : (
        <Input className={className} id={id} placeholder={placeholder} ref={ref} {...passThrough} />
      )}
      {methods?.formState?.errors[props.name] && (
        <Alert className="mt-4" severity="error" message={methods.formState.errors[props.name].message} />
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

type NumericFieldProps = InputFieldProps & { validate: (numericValue: string) => boolean };

// prettier-ignore
export const NumericField = forwardRef<HTMLInputElement, NumericFieldProps>(
  function NumericField({ value, validate, ...props }, ref) {
    const [numericValue, setNumericValue] = useState<any>(value);

    function onChange(event: React.ChangeEvent<HTMLInputElement>) {
      if (validate(event.target.value)) {
        setNumericValue(Number(event.target.value));
      }
    }

    return (
      <InputField
        ref={ref}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={numericValue}
        onInput={onChange}
        {...props}
      />
    );
  }
);

// prettier-ignore
export const RadioButton = forwardRef<HTMLInputElement, InputFieldProps>(
  function RadioButton({ className, label, ...props }, ref) {
    const id = useId();

    return (
      <label className="cursor-pointer" htmlFor={id}>
        <input className={cn('peer sr-only', className)} type="radio" id={id} ref={ref} {...props} />
        <div className="flex h-full w-full items-center justify-center text-center rounded border border-pink-500 px-3 py-2 text-sm font-semibold text-pink-600 peer-checked:border-transparent peer-checked:bg-pink-500 peer-checked:text-white">
          {label}
        </div>
      </label>
    );
  }
);

type FormProps<T> = {
  form: UseFormReturn<T>;
  handleSubmit: SubmitHandler<T>;
} & Omit<JSX.IntrinsicElements['form'], 'onSubmit'>;

const PlainForm = <T extends FieldValues>(props: FormProps<T>, ref: React.Ref<HTMLFormElement>) => {
  const { form, handleSubmit, children, ...passThrough } = props;

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      await form.handleSubmit(handleSubmit)(event);
    } catch (error) {
      const errors = error.response.data?.errors;

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
};

// prettier-ignore
export const Form = forwardRef(PlainForm) as 
  <T extends FieldValues>(p: FormProps<T> & { ref?: React.Ref<HTMLFormElement> }) => React.ReactElement;
