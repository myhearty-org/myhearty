import { EditVolunteerEventForm } from './edit-volunteer-event-form';
import { VolunteerEventInfoAccordion } from './volunteer-event-info-accordion';

export function Edit() {
  return (
    <div className="flex flex-col gap-6">
      <VolunteerEventInfoAccordion />
      <EditVolunteerEventForm />
    </div>
  );
}
