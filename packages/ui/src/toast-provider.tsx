import { XIcon } from '@heroicons/react/solid';
import { toast, ToastBar, Toaster } from 'react-hot-toast';

export function ToastProvider() {
  return (
    <Toaster position="top-right">
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <>
              {icon}
              {message}
              {t.type !== 'loading' && (
                <button className="rounded p-1" onClick={() => toast.dismiss(t.id)}>
                  <XIcon className="h-4 w-4" />
                </button>
              )}
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
}
