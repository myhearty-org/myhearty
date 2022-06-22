import { Alert } from '../alert';
import cn from 'classnames';
import formatISO from 'date-fns/formatISO';
import parseISO from 'date-fns/parseISO';
import get from 'lodash/get';
import { forwardRef, useId, useState } from 'react';
import { useFormContext } from 'react-hook-form';

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

type InputFieldProps = {
  layout?: 'horizontal' | 'vertical';
  label?: React.ReactNode;
  labelProps?: React.ComponentProps<typeof Label>;
  addOnLeading?: React.ReactNode;
  visible?: boolean;
} & React.ComponentProps<typeof Input>;

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(function InputField(props, ref) {
  const id = useId();
  const methods = useFormContext();
  const {
    layout = 'vertical',
    label = props.name,
    labelProps,
    placeholder,
    className,
    addOnLeading,
    visible = true,
    ...passThrough
  } = props;

  const errorMessage = get(methods?.formState?.errors, `${props.name}.message`);

  return (
    <div
      className={cn(
        !visible && 'invisible',
        layout === 'horizontal' && 'md:grid md:grid-cols-12 md:gap-x-4'
      )}>
      <div className={cn(layout === 'horizontal' && 'md:col-span-4')}>
        {label && (
          <Label htmlFor={id} {...labelProps}>
            {label}
          </Label>
        )}
      </div>
      <div className={cn(layout === 'horizontal' && 'md:col-span-8')}>
        {addOnLeading ? (
          <div className={cn('flex', layout === 'horizontal' ? 'md:mt-0' : 'mt-2')}>
            {addOnLeading}
            <Input
              className={cn(className, 'mt-0 rounded-l-none')}
              id={id}
              placeholder={placeholder}
              ref={ref}
              {...passThrough}
            />
          </div>
        ) : (
          <Input
            className={cn(className, layout === 'horizontal' && 'md:mt-0')}
            id={id}
            placeholder={placeholder}
            ref={ref}
            {...passThrough}
          />
        )}
        {errorMessage && <Alert className="mt-4" severity="error" message={errorMessage} />}
      </div>
    </div>
  );
});

export const TextInput = forwardRef<HTMLInputElement, InputFieldProps>(function TextInput(props, ref) {
  return <InputField ref={ref} {...props} />;
});

// prettier-ignore
export const PasswordInput = forwardRef<HTMLInputElement, InputFieldProps>(function PasswordInput(props, ref) {
  return <InputField type="password" ref={ref} {...props} />;
});

export const EmailInput = forwardRef<HTMLInputElement, InputFieldProps>(function EmailInput(props, ref) {
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

export const PhoneInput = forwardRef<HTMLInputElement, InputFieldProps>(function PhoneInput(props, ref) {
  return <InputField ref={ref} type="tel" inputMode="tel" pattern="[0-9]*" {...props} />;
});

type NumericInputProps = InputFieldProps & { validate: (numericValue: string) => boolean };

// prettier-ignore
export const NumericInput = forwardRef<HTMLInputElement, NumericInputProps>(
  function NumericInput({ value, validate, ...props }, ref) {
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
export const DateInput = forwardRef<HTMLInputElement, InputFieldProps>(
  function DateInput({ defaultValue, ...props }, ref) {
    let dateValue = defaultValue;

    if (dateValue) {
      dateValue = formatISO(parseISO(dateValue as string), { representation: 'date' });
    }

    return <InputField ref={ref} type="date" defaultValue={dateValue} {...props} />;
  }
);

type CheckboxProps = InputFieldProps & { description?: string };

// prettier-ignore
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ label, description, className, ...props }, ref) {
    const id = useId();

    return (
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            className={cn(
              'focus:outline-none focus:ring focus:ring-pink-300 h-4 w-4 text-pink-500 border-gray-300 rounded',
              className
            )}
            type="checkbox"
            id={id}
            ref={ref}
            {...props}
          />
        </div>
        <div className="ml-3 text-sm">
          <label className="font-medium text-gray-700" htmlFor={id}>
            {label}
          </label>
          {description && <p className="text-gray-500">{description}</p>}
        </div>
      </div>
    );
  }
);

type TextAreaProps = Omit<JSX.IntrinsicElements['textarea'], 'name'> & { name: string; label: string };

// prettier-ignore
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea({ label, className, ...props }, ref) {
    const id = useId();

    return (
      <div>
        <Label htmlFor={id}>{label}</Label>
        <textarea
          className={cn(
            'mt-2 p-2 block w-full rounded border-gray-300 shadow-sm focus:border-pink-300 focus:outline-none focus:ring focus:ring-pink-300 sm:text-sm',
            className
          )}
          id={id}
          ref={ref}
          {...props}
        />
      </div>
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
