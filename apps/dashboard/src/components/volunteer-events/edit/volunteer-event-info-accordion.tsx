import { LoadingAccordion } from '@components/ui/loading';
import { Accordion } from '@mantine/core';
import { useVolunteerEvent } from '@myhearty/hooks';
import { Alert } from '@myhearty/ui/alert';
import { useRouter } from 'next/router';

export function VolunteerEventInfoAccordion() {
  const router = useRouter();
  const { slug } = router.query;
  const { volunteerEvent, isLoading } = useVolunteerEvent(slug as string);

  if (isLoading) {
    return <LoadingAccordion n={2} />;
  }

  return (
    <Accordion className="border-x border-t border-gray-200 bg-white" multiple>
      <Accordion.Item label="Page URL">
        {volunteerEvent?.published ? (
          <Alert
            severity="success"
            title="Your volunteer event page has been published successfully!"
            message={
              <p>
                Visit the published volunteer event via the following link:{' '}
                <a
                  className="text-blue-600 hover:underline"
                  href={volunteerEvent.pageUrl}
                  target="_blank"
                  rel="noreferrer">
                  {volunteerEvent.pageUrl}
                </a>
              </p>
            }
          />
        ) : (
          <Alert
            severity="info"
            title="Your volunteer event page is still in editing stage and is not yet published."
            message="You can publish your volunteer event page once you have finished editing."
          />
        )}
      </Accordion.Item>
      <Accordion.Item label="Page Editing Rules">
        <div className="flex flex-col gap-4">
          <Alert
            severity="warning"
            title="After the volunteer event page is published, you can no longer unpublish it or edit its:"
            message={
              <ul className="list-inside list-disc">
                <li>Name</li>
              </ul>
            }
          />
          <Alert
            severity="warning"
            title="After the application deadline is reached, you can no longer edit its:"
            message={
              <ul className="list-inside list-disc">
                <li>Number of openings</li>
                <li>Location</li>
                <li>Application deadline</li>
                <li>Start date and time</li>
                <li>End date and time</li>
              </ul>
            }
          />
        </div>
      </Accordion.Item>
    </Accordion>
  );
}
