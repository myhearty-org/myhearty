import { CalendarXIcon } from '@components/ui/icons';
import format from 'date-fns/format';

type ApplicationDeadlineCardProps = {
  applicationDeadline: string;
};

export function ApplicationDeadlineCard({ applicationDeadline }: ApplicationDeadlineCardProps) {
  return (
    <div className="flex w-full flex-col gap-4 rounded-md border border-gray-200 bg-white py-3 px-6 shadow-md">
      <h2 className="border-b border-gray-200 pb-1 font-medium">Application Deadline</h2>
      <div className="flex flex-col gap-1">
        <div className="flex">
          <CalendarXIcon className="mr-3 h-6 w-6 flex-shrink-0 fill-pink-600" />
          <span className="text-sm">{format(new Date(applicationDeadline), 'E, d MMM yyyy, hh:mm a')}</span>
        </div>
      </div>
    </div>
  );
}
