import { Spinner } from './icons';
import cn from 'classnames';

type LoadingProps = {
  isLoading: boolean;
  children?: React.ReactNode;
};

export function Loading({ isLoading, children }: LoadingProps) {
  return (
    <div className="relative transition-all">
      {children && (
        <div className={cn('transition-opacity duration-300', isLoading && 'opacity-40')}>{children}</div>
      )}
      {isLoading && <Spinner className="absolute inset-0 m-auto h-6 w-6 animate-spin text-pink-400" />}
    </div>
  );
}
