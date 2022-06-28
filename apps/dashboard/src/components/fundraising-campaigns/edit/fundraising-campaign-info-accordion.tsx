import { LoadingAccordion } from '@components/ui/loading';
import { Accordion } from '@mantine/core';
import { useFundraisingCampaign } from '@myhearty/hooks';
import { Alert } from '@myhearty/ui/alert';
import { useRouter } from 'next/router';

export function FundraisingCampaignInfoAccordion() {
  const router = useRouter();
  const { slug } = router.query;
  const { fundraisingCampaign, isLoading } = useFundraisingCampaign(slug as string);

  if (isLoading) {
    return <LoadingAccordion n={2} />;
  }

  return (
    <Accordion className="border-x border-t border-gray-200 bg-white" multiple>
      <Accordion.Item label="Page URL">
        {fundraisingCampaign?.published ? (
          <Alert
            severity="success"
            title="Your fundraising campaign page has been published successfully!"
            message={
              <p>
                Visit the published fundraising campaign via the following link:{' '}
                <a
                  className="text-blue-600 hover:underline"
                  href={fundraisingCampaign.pageUrl}
                  target="_blank"
                  rel="noreferrer">
                  {fundraisingCampaign.pageUrl}
                </a>
              </p>
            }
          />
        ) : (
          <Alert
            severity="info"
            title="Your fundraising campaign page is still in editing stage and is not yet published."
            message="You can publish your fundraising campaign page once you have finished editing."
          />
        )}
      </Accordion.Item>
      <Accordion.Item label="Page Editing Rules">
        <Alert
          severity="warning"
          title="After the fundraising campaign page is published, you can no longer delete it, unpublish it or edit its:"
          message={
            <ul className="list-inside list-disc">
              <li>Name</li>
              <li>Fundraising target amount</li>
              <li>End date and time</li>
            </ul>
          }
        />
      </Accordion.Item>
    </Accordion>
  );
}
