import { XIcon } from '@heroicons/react/outline';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import cn from 'classnames';
import { forwardRef } from 'react';

type DialogProps = React.ComponentProps<typeof DialogPrimitive['Root']>;

export function Dialog({ children, ...props }: DialogProps) {
  return (
    <DialogPrimitive.Root {...props}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fade-in fixed inset-0 z-40 bg-black bg-opacity-60 transition-opacity" />
        {children}
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

type DialogContentProps = React.ComponentProps<typeof DialogPrimitive['Content']> & {
  size?: 'base' | 'xl' | 'lg';
};

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(function DialogContent(
  { className, size = 'base', children, ...props },
  forwardedRef
) {
  return (
    <DialogPrimitive.Content
      className={cn(
        'fade-in fixed left-1/2 top-1/2 z-[9998] min-w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white text-left shadow-xl focus:outline-none focus:ring-0 sm:w-full sm:align-middle',
        size == 'base' && 'px-6 pb-6 pt-8 sm:max-w-[35rem]',
        size == 'lg' && 'px-6 pb-6 pt-8 sm:max-w-[70rem]',
        size == 'xl' && 'p-0.5 sm:max-w-[98vw]',
        'max-h-[80vh] overflow-auto overscroll-auto',
        className
      )}
      ref={forwardedRef}
      {...props}>
      {children}
      <DialogPrimitive.Close asChild>
        <XIcon className="absolute top-2 right-2 h-6 w-6 cursor-pointer text-gray-400 hover:text-gray-500" />
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  );
});

type DialogHeaderProps = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
};

export function DialogHeader({ title, subtitle }: DialogHeaderProps) {
  return (
    <div>
      <h3 className="text-lg text-gray-900 font-medium break-words" id="modal-title">
        {title}
      </h3>
      {subtitle && <div className="text-sm text-gray-400 break-words">{subtitle}</div>}
    </div>
  );
}

type DialogFooterProps = {
  children: React.ReactNode;
};

export function DialogFooter({ children }: DialogFooterProps) {
  return <div className="flex justify-end space-x-2">{children}</div>;
}

export const DialogTrigger = DialogPrimitive.Trigger;
