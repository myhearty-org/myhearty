import { CheckCircleIcon, ExclamationIcon, InformationCircleIcon, XCircleIcon } from '@heroicons/react/solid';
import cn from 'classnames';
import { ReactNode } from 'react';

export type AlertProps = {
  title?: ReactNode;
  message?: ReactNode;
  actions?: ReactNode;
  className?: string;
  severity: 'success' | 'warning' | 'error' | 'info';
};

export function Alert({ title, message, actions, className, severity }: AlertProps) {
  return (
    <div
      className={cn(
        'rounded border border-opacity-20 p-3',
        className,
        severity === 'error' && 'border-red-900 bg-red-50 text-red-600',
        severity === 'warning' && 'border-yellow-700 bg-yellow-50 text-yellow-700',
        severity === 'info' && 'border-sky-700 bg-sky-50 text-sky-700',
        severity === 'success' && 'border-green-900 bg-green-50 text-green-600'
      )}>
      <div className="flex">
        <div className="flex-shrink-0">
          {severity === 'error' && <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />}
          {severity === 'warning' && (
            <ExclamationIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
          )}
          {severity === 'info' && (
            <InformationCircleIcon className="h-5 w-5 text-sky-400" aria-hidden="true" />
          )}
          {severity === 'success' && (
            <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
          )}
        </div>
        <div className="ml-3 flex-grow">
          <h3 className="text-sm font-medium">{title}</h3>
          <div className="text-sm">{message}</div>
        </div>
        {actions && <div className="text-sm">{actions}</div>}
      </div>
    </div>
  );
}
