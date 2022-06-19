import { VolunteerEvent } from '@myhearty/lib/types';
import { CardButton } from '@myhearty/ui/card-button';

type VolunteerEventCardProps = {
  volunteerEvent: VolunteerEvent;
};

export function VolunteerEventCard({ volunteerEvent }: VolunteerEventCardProps) {
  const { name, slug } = volunteerEvent;

  return (
    <li className="col-span-1">
      <CardButton
        linkHref={`/volunteer-events/${slug}/edit`}
        title={
          <div className="flex w-full justify-between gap-1">
            <span className="line-clamp-2 flex-shrink">{name}</span>
          </div>
        }
      />
    </li>
  );
}
