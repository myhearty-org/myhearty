import { EditFundraisingCampaignForm } from './edit-fundraising-campaign-form';
import { FundraisingCampaignInfoAccordion } from './fundraising-campaign-info-accordion';

export function Edit() {
  return (
    <div className="flex flex-col gap-6">
      <FundraisingCampaignInfoAccordion />
      <EditFundraisingCampaignForm />
    </div>
  );
}
