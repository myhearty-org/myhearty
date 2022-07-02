import { Alert } from '../alert';
import { formatDate } from '@myhearty/utils/common';
import cn from 'classnames';
import get from 'lodash/get';
import { forwardRef, useId, useState } from 'react';
import { useFormContext } from 'react-hook-form';

type InputProps = Omit<JSX.IntrinsicElements['input'], 'name'> & { name: string };

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      className={cn(
        'mt-2 block w-full rounded border border-gray-300 py-2 px-3 shadow-sm sm:text-sm',
        'focus:border-pink-300 focus:outline-none focus:ring focus:ring-pink-300',
        'read-only:cursor-default read-only:bg-slate-100',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = 'Input';

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

const InputField = forwardRef<HTMLInputElement, InputFieldProps>((props, ref) => {
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

  const errorMessage = get(methods?.formState?.errors, `${props.name}.message`) as any;

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
          <div className={cn('mt-2 flex', layout === 'horizontal' && 'md:mt-0')}>
            {addOnLeading}
            <Input
              className={cn(className, '!mt-0 rounded-l-none')}
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

InputField.displayName = 'InputField';

export const TextInput = forwardRef<HTMLInputElement, InputFieldProps>((props, ref) => {
  return <InputField ref={ref} type="text" {...props} />;
});

TextInput.displayName = 'TextInput';

export const PasswordInput = forwardRef<HTMLInputElement, InputFieldProps>((props, ref) => {
  return <InputField type="password" ref={ref} {...props} />;
});

PasswordInput.displayName = 'PasswordInput';

export const EmailInput = forwardRef<HTMLInputElement, InputFieldProps>((props, ref) => {
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

EmailInput.displayName = 'EmailInput';

export const PhoneInput = forwardRef<HTMLInputElement, InputFieldProps>((props, ref) => {
  return <InputField ref={ref} type="tel" inputMode="tel" pattern="[0-9]*" {...props} />;
});

PhoneInput.displayName = 'PhoneInput';

type NumericInputProps = InputFieldProps & { validate: (numericValue: string) => boolean };

export const NumericInput = forwardRef<HTMLInputElement, NumericInputProps>(
  ({ defaultValue, validate, ...props }, ref) => {
    const [numericValue, setNumericValue] = useState<any>(defaultValue ?? '');

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

NumericInput.displayName = 'NumericInput';

export const DateInput = forwardRef<HTMLInputElement, InputFieldProps>(({ defaultValue, ...props }, ref) => {
  defaultValue = formatDate(defaultValue as string, 'yyyy-MM-dd');

  return <InputField ref={ref} type="date" defaultValue={defaultValue} {...props} />;
});

DateInput.displayName = 'DateInput';

export const DateTimeInput = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ defaultValue, min, max, ...props }, ref) => {
    defaultValue = formatDate(defaultValue as string, "yyyy-MM-dd'T'HH:mm");
    min = formatDate(min as string, "yyyy-MM-dd'T'HH:mm");
    max = formatDate(max as string, "yyyy-MM-dd'T'HH:mm");

    return (
      <InputField
        ref={ref}
        type="datetime-local"
        defaultValue={defaultValue}
        min={min}
        max={max}
        {...props}
      />
    );
  }
);

DateTimeInput.displayName = 'DateTimeInput';

type CheckboxProps = InputFieldProps & { description?: string };

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, className, ...props }, ref) => {
    const id = useId();

    return (
      <div className="flex items-start">
        <div className="flex h-5 items-center">
          <input
            className={cn(
              'h-4 w-4 rounded border-gray-300 text-pink-500 focus:outline-none focus:ring focus:ring-pink-300',
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

Checkbox.displayName = 'Checkbox';

type SwitchProps = InputFieldProps & { description?: string };

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(({ label, description, ...props }, ref) => {
  const id = useId();

  return (
    <div className="md:grid md:grid-cols-12 md:gap-x-4">
      <div className="md:col-span-4">
        <Label htmlFor={id}>{label}</Label>
      </div>
      <div className="mt-2 md:col-span-8 md:mt-0">
        <label className="relative inline-flex cursor-pointer items-center" htmlFor={id}>
          <input className="peer sr-only" type="checkbox" id={id} ref={ref} {...props} />
          <div
            className={cn(
              'peer h-6 w-11 rounded-full bg-gray-200',
              'after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all',
              'peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300',
              props.disabled ? 'peer-checked:bg-pink-300' : 'peer-checked:bg-pink-600'
            )}
          />
        </label>
        <div className="mt-1 text-sm text-gray-900">{description}</div>
      </div>
    </div>
  );
});

Switch.displayName = 'Switch';

type TextAreaProps = Omit<JSX.IntrinsicElements['textarea'], 'name'> & { name: string; label: string };

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, className, ...props }, ref) => {
    const id = useId();

    return (
      <div>
        <Label htmlFor={id}>{label}</Label>
        <textarea
          className={cn(
            'mt-2 block w-full rounded border-gray-300 p-2 shadow-sm focus:border-pink-300 focus:outline-none focus:ring focus:ring-pink-300 sm:text-sm',
            'read-only:cursor-default read-only:bg-slate-100',
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

TextArea.displayName = 'TextArea';

export const RadioButton = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, label, ...props }, ref) => {
    const id = useId();

    return (
      <label className="cursor-pointer" htmlFor={id}>
        <input className={cn('peer sr-only', className)} type="radio" id={id} ref={ref} {...props} />
        <div className="flex h-full w-full items-center justify-center rounded border border-pink-500 px-3 py-2 text-center text-sm font-semibold text-pink-600 peer-checked:border-transparent peer-checked:bg-pink-500 peer-checked:text-white">
          {label}
        </div>
      </label>
    );
  }
);

RadioButton.displayName = 'RadioButton';
