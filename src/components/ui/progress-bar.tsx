import cn from 'classnames';

type ProgressBarProps = {
  className?: string;
  color: string;
  percentage: number;
};

export function ProgressBar({ className, color, percentage }: ProgressBarProps) {
  percentage = Math.min(percentage, 100);

  return (
    <div className={cn('h-2.5 w-full rounded-full bg-gray-100', className)}>
      <div className={cn('h-2.5 rounded-full', color)} style={{ width: `${percentage}%` }} />
    </div>
  );
}
