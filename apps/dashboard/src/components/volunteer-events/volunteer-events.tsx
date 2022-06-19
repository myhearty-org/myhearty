import { VolunteerEventsList } from './volunteer-events-list';
import { Button } from '@mantine/core';
import Link from 'next/link';

export function VolunteerEvents() {
  return (
    <div>
      <h4 className="mb-3 text-lg font-medium">Volunteer Events</h4>
      <div className="mb-4 flex items-center">
        <Link href="/volunteer-events/new" passHref>
          <Button component="a" size="xs">
            New volunteer event
          </Button>
        </Link>
      </div>
      <VolunteerEventsList />
    </div>
  );
}
