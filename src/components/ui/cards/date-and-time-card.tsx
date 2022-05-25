import { CalendarIcon, ClockIcon } from '@heroicons/react/solid';
import { useHasMounted } from '@hooks/index';
import differenceInDays from 'date-fns/differenceInDays';
import format from 'date-fns/format';
import pluralize from 'pluralize';

type DateAndTimeCardProps = {
  startDatetime: string;
  endDatetime: string;
};

export function DateAndTimeCard({ startDatetime, endDatetime }: DateAndTimeCardProps) {
  const hasMounted = useHasMounted();
  if (!hasMounted) return null;

  const currentDatetime = new Date();
  const dayCount = Math.max(differenceInDays(new Date(endDatetime), currentDatetime), 0);

  return (
    <div className="flex w-full flex-col gap-4 rounded-md border border-gray-200 bg-white py-3 px-6 shadow-md">
      <h2 className="border-b border-gray-200 pb-1 font-medium">Date and Time</h2>
      <div className="flex flex-col gap-1">
        <div className="flex">
          <CalendarIcon className="mr-3 h-6 w-6 flex-shrink-0 text-pink-600" />
          <span className="text-sm">
            <p>{format(new Date(startDatetime), 'E, d MMM yyyy, hh:mm a')} –</p>
            <p>{format(new Date(endDatetime), 'E, d MMM yyyy, hh:mm a')}</p>
          </span>
        </div>
        <div className="flex">
          <ClockIcon className="mr-3 h-6 w-6 flex-shrink-0 text-pink-600" />
          <span className="text-sm">
            {dayCount.toLocaleString()} {pluralize('day', dayCount)} left
          </span>
        </div>
      </div>
    </div>
  );
}
