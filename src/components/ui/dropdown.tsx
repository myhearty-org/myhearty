import { CheckCircleIcon } from '@heroicons/react/outline';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import cn from 'classnames';
import { ComponentProps, forwardRef } from 'react';

export const Dropdown = DropdownMenuPrimitive.Root;

type DropdownMenuTriggerProps = ComponentProps<typeof DropdownMenuPrimitive['Trigger']>;

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

type DropdownMenuContentProps = ComponentProps<typeof DropdownMenuPrimitive['Content']>;

export const DropdownMenuContent = forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  function DropdownMenuContent({ children, ...props }, forwardedRef) {
    return (
      <DropdownMenuPrimitive.Content
        className="w-50 z-10 -ml-0 origin-top-right rounded-md bg-white text-sm shadow-lg ring-2 ring-black ring-opacity-5 focus:outline-none"
        ref={forwardedRef}
        portalled={props.portalled}
        {...props}>
        {children}
      </DropdownMenuPrimitive.Content>
    );
  }
);

type DropdownMenuLabelProps = ComponentProps<typeof DropdownMenuPrimitive['Label']>;

export function DropdownMenuLabel(props: DropdownMenuLabelProps) {
  return <DropdownMenuPrimitive.Label className="px-3 py-2 text-gray-500" {...props} />;
}

type DropdownMenuItemProps = ComponentProps<typeof DropdownMenuPrimitive['CheckboxItem']>;

// prettier-ignore
export const DropdownMenuItem = forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  function DropdownMenuItem({ className = '', ...props }, forwardedRef) {
    return (
      <DropdownMenuPrimitive.Item
        className={cn('text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900', className)}
        {...props}
        ref={forwardedRef}
      />
    );
  }
);

export const DropdownMenuGroup = DropdownMenuPrimitive.Group;

type DropdownMenuCheckboxItemProps = ComponentProps<typeof DropdownMenuPrimitive['CheckboxItem']>;

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

type DropdownMenuRadioItemProps = ComponentProps<typeof DropdownMenuPrimitive['RadioItem']>;

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
