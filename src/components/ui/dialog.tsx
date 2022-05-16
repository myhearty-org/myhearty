import * as DialogPrimitive from '@radix-ui/react-dialog';
import cn from 'classnames';
import { ComponentProps, forwardRef, ReactNode } from 'react';

type DialogProps = ComponentProps<typeof DialogPrimitive['Root']>;

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

type DialogContentProps = ComponentProps<typeof DialogPrimitive['Content']> & {
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
        size == 'base' && 'p-6 sm:max-w-[35rem]',
        size == 'lg' && 'p-6 sm:max-w-[70rem]',
        size == 'xl' && 'p-0.5 sm:max-w-[98vw]',
        'h-auto max-h-[560px] overflow-auto overscroll-auto md:max-h-[inherit]',
        className
      )}
      ref={forwardedRef}
      {...props}>
      {children}
    </DialogPrimitive.Content>
  );
});

type DialogHeaderProps = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
};

export function DialogHeader({ title, subtitle }: DialogHeaderProps) {
  return (
    <div className="mb-8">
      <h3 className="text-xl text-gray-900" id="modal-title">
        {title}
      </h3>
      {subtitle && <div className="text-sm text-gray-400">{subtitle}</div>}
    </div>
  );
}

type DialogFooterProps = {
  children: ReactNode;
};

export function DialogFooter({ children }: DialogFooterProps) {
  return (
    <div>
      <div className="flex justify-end space-x-2">{children}</div>
    </div>
  );
}

export const DialogTrigger = DialogPrimitive.Trigger;

export const DialogClose = DialogPrimitive.Close;
