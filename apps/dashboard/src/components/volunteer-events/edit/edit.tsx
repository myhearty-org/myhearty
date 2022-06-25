import { EditVolunteerEventForm } from './edit-volunteer-event-form';
import { VolunteerEventDangerZone } from './volunteer-event-danger-zone';
import { VolunteerEventInfoAccordion } from './volunteer-event-info-accordion';

export function Edit() {
  return (
    <div className="flex flex-col gap-6">
      <VolunteerEventInfoAccordion />
      <EditVolunteerEventForm />
      <VolunteerEventDangerZone />
    </div>
  );
}
