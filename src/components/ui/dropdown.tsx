import { CheckCircleIcon } from '@heroicons/react/outline';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import cn from 'classnames';
import { forwardRef } from 'react';

type DropdownProps = React.ComponentProps<typeof DropdownMenuPrimitive['Root']>;

export function Dropdown(props: DropdownProps) {
  return <DropdownMenuPrimitive.Root modal={false} {...props} />;
}

type DropdownMenuTriggerProps = React.ComponentProps<typeof DropdownMenuPrimitive['Trigger']>;

export const DropdownMenuTrigger = forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(
  function DropdownMenuTrigger({ className = '', ...props }, forwardedRef) {
    return (
      <DropdownMenuPrimitive.Trigger
        className={
          props.asChild
            ? className
            : cn(
                className,
                'inline-flex items-center rounded bg-transparent px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1 group-hover:text-black'
              )
        }
        ref={forwardedRef}
        {...props}
      />
    );
  }
);

export const DropdownMenuTriggerItem = DropdownMenuPrimitive.TriggerItem;

type DropdownMenuContentProps = React.ComponentProps<typeof DropdownMenuPrimitive['Content']>;

export const DropdownMenuContent = forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  function DropdownMenuContent({ children, ...props }, forwardedRef) {
    return (
      <DropdownMenuPrimitive.Content
        className="w-50 z-50 origin-top-right rounded-md bg-white py-2 text-sm shadow-lg drop-shadow-md focus:outline-none focus:ring-0"
        ref={forwardedRef}
        onCloseAutoFocus={(e) => e.preventDefault()}
        onFocusOutside={(e) => e.preventDefault()}
        portalled={props.portalled}
        {...props}>
        {children}
      </DropdownMenuPrimitive.Content>
    );
  }
);

type DropdownMenuLabelProps = React.ComponentProps<typeof DropdownMenuPrimitive['Label']>;

export function DropdownMenuLabel(props: DropdownMenuLabelProps) {
  return <DropdownMenuPrimitive.Label className="px-3 py-2 text-gray-500" {...props} />;
}

type DropdownMenuItemProps = React.ComponentProps<typeof DropdownMenuPrimitive['CheckboxItem']>;

// prettier-ignore
export const DropdownMenuItem = forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  function DropdownMenuItem({ className = '', ...props }, forwardedRef) {
    return (
      <DropdownMenuPrimitive.Item
        className={cn('flex cursor-pointer px-4 py-1 text-sm focus:bg-pink-500 focus:text-white focus:rounded-none focus:outline-none focus:ring-0', className)}
        {...props}
        ref={forwardedRef}
      />
    );
  }
);

export const DropdownMenuGroup = DropdownMenuPrimitive.Group;

type DropdownMenuCheckboxItemProps = React.ComponentProps<typeof DropdownMenuPrimitive['CheckboxItem']>;

export const DropdownMenuCheckboxItem = forwardRef<HTMLDivElement, DropdownMenuCheckboxItemProps>(
  function DropdownMenuCheckboxItem({ children, ...props }, forwardedRef) {
    return (
      <DropdownMenuPrimitive.CheckboxItem ref={forwardedRef} {...props}>
        {children}
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckCircleIcon />
        </DropdownMenuPrimitive.ItemIndicator>
      </DropdownMenuPrimitive.CheckboxItem>
    );
  }
);

export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

type DropdownMenuRadioItemProps = React.ComponentProps<typeof DropdownMenuPrimitive['RadioItem']>;

export const DropdownMenuRadioItem = forwardRef<HTMLDivElement, DropdownMenuRadioItemProps>(
  function DropdownMenuRadioItem({ children, ...props }, forwardedRef) {
    return (
      <DropdownMenuPrimitive.RadioItem {...props} ref={forwardedRef}>
        {children}
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckCircleIcon />
        </DropdownMenuPrimitive.ItemIndicator>
      </DropdownMenuPrimitive.RadioItem>
    );
  }
);

export const DropdownMenuSeparator = DropdownMenuPrimitive.Separator;

export const DropdownMenuArrow = DropdownMenuPrimitive.Arrow;
