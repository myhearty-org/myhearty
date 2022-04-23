import { Spinner } from '@components/ui/icons/spinner';
import cn from 'classnames';
import Link, { LinkProps } from 'next/link';
import React, { forwardRef } from 'react';

type SVGComponent = React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

export type ButtonBaseProps = {
  color?: 'primary' | 'secondary' | 'minimal' | 'warn';
  size?: 'base' | 'sm' | 'lg' | 'fab' | 'icon';
  loading?: boolean;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  StartIcon?: SVGComponent;
  EndIcon?: SVGComponent;
  shallow?: boolean;
};

export type ButtonProps = ButtonBaseProps &
  (
    | (Omit<JSX.IntrinsicElements['a'], 'href'> & { href: LinkProps['href'] })
    | (JSX.IntrinsicElements['button'] & { href?: never })
  );

export const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonProps>(function Button(
  props: ButtonProps,
  forwardedRef
) {
  const {
    loading = false,
    color = 'primary',
    size = 'base',
    StartIcon,
    EndIcon,
    shallow,
    ...passThroughProps
  } = props;

  const disabled = props.disabled || loading;

  const isLink = typeof props.href !== 'undefined';
  const elementType = isLink ? 'a' : 'button';

  const element = React.createElement(
    elementType,
    {
      ...passThroughProps,
      disabled,
      ref: forwardedRef,
      className: cn(
        'inline-flex items-center',

        size === 'sm' && 'px-3 py-2 text-sm leading-4 font-medium rounded',
        size === 'base' && 'px-3 py-2 text-sm font-medium rounded',
        size === 'lg' && 'px-4 py-2 text-base font-medium rounded',
        size === 'icon' &&
          'group p-2 border rounded border-transparent text-gray-400 hover:border-gray-200 transition',

        size === 'fab' ? 'fixed' : 'relative',
        size === 'fab' && 'justify-center bottom-20 right-8 rounded-full p-4 w-14 h-14',

        color === 'primary' &&
          (disabled
            ? 'border border-transparent bg-pink-600 text-white'
            : 'border border-transparent text-white bg-pink-500 hover:bg-opacity-90 hover:shadow-md focus:outline-none focus:ring focus:ring-pink-300'),

        color === 'secondary' &&
          (disabled
            ? 'border border-gray-200 text-gray-400 bg-white'
            : 'border border-gray-300 text-gray-900 bg-white hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm focus:outline-none focus:border-pink-300 focus:ring focus:ring-pink-300'),

        color === 'minimal' &&
          (disabled
            ? 'text-gray-400 bg-transparent'
            : 'text-gray-900 bg-transparent hover:bg-pink-50 focus:outline-none focus:ring focus:bg-pink-100 focus:ring-pink-300'),

        color === 'warn' &&
          (disabled
            ? 'border border-transparent text-white bg-red-600'
            : 'border border-transparent text-white bg-red-500 hover:bg-opacity-90 hover:shadow-md focus:outline-none focus:ring focus:ring-red-300'),

        loading ? 'cursor-wait' : disabled ? 'cursor-not-allowed' : '',
        props.className
      ),
      onClick: disabled
        ? (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
            e.preventDefault();
          }
        : props.onClick,
    },
    <>
      {StartIcon && (
        <StartIcon
          className={cn('inline', size === 'icon' ? 'h-5 w-5' : '-ml-1 h-5 w-5 ltr:mr-2 rtl:ml-2 rtl:-mr-1')}
        />
      )}
      {props.children}
      {loading && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <Spinner theme={color === 'primary' ? 'light' : 'dark'} />
        </div>
      )}
      {EndIcon && <EndIcon className="-mr-1 inline h-5 w-5 ltr:ml-2 rtl:mr-2" />}
    </>
  );

  return props.href ? (
    <Link passHref href={props.href} shallow={shallow && shallow}>
      {element}
    </Link>
  ) : (
    element
  );
});
