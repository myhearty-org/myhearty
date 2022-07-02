import { LoadingAccordion } from '@components/ui/loading';
import { Accordion } from '@mantine/core';
import { useCharitableAid } from '@myhearty/hooks';
import { Alert } from '@myhearty/ui/alert';
import { useRouter } from 'next/router';

export function CharitableAidInfoAccordion() {
  const router = useRouter();
  const { slug } = router.query;
  
  const { charitableAid, isLoading } = useCharitableAid(slug as string);

  if (isLoading) {
    return <LoadingAccordion n={2} />;
  }

  return (
    <Accordion className="border-x border-t border-gray-200 bg-white" multiple>
      <Accordion.Item label="Page URL">
        {charitableAid?.published ? (
          <Alert
            severity="success"
            title="Your charitable aid page has been published successfully!"
            message={
              <p>
                Visit the published charitable aid via the following link:{' '}
                <a
                  className="text-blue-600 hover:underline"
                  href={charitableAid.pageUrl}
                  target="_blank"
                  rel="noreferrer">
                  {charitableAid.pageUrl}
                </a>
              </p>
            }
          />
        ) : (
          <Alert
            severity="info"
            title="Your charitable aid page is still in editing stage and is not yet published."
            message="You can publish your charitable aid page once you have finished editing."
          />
        )}
      </Accordion.Item>
      <Accordion.Item label="Page Editing Rules">
        <div className="flex flex-col gap-4">
          <Alert
            severity="warning"
            title="After the charitable aid page is published, you can no longer delete it, unpublish it or edit its:"
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
              </ul>
            }
          />
        </div>
      </Accordion.Item>
    </Accordion>
  );
}
