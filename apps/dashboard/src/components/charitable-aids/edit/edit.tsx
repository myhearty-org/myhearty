import { CharitableAidDangerZone } from './charitable-aid-danger-zone';
import { CharitableAidInfoAccordion } from './charitable-aid-info-accordion';
import { EditCharitableAidForm } from './edit-charitable-aid-form';

export function Edit() {
  return (
    <div className="flex flex-col gap-6">
      <CharitableAidInfoAccordion />
      <EditCharitableAidForm />
      <CharitableAidDangerZone />
    </div>
  );
}
