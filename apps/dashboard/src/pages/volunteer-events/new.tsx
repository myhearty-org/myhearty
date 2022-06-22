import { WizardLayout } from '@components/layouts';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mantine/core';
import { createVolunteerEvent } from '@myhearty/lib/organizations';
import { CreateVolunteerEvent, CreateVolunteerEventSchema } from '@myhearty/lib/types';
import { Form, TextInput } from '@myhearty/ui/form';
import { Panel } from '@myhearty/ui/panel';
import { showToast } from '@myhearty/utils/show-toast';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

type CreateVolunteerEventFormData = CreateVolunteerEvent;

export default function NewVolunteerEventPage() {
  const form = useForm<CreateVolunteerEventFormData>({
    resolver: zodResolver(CreateVolunteerEventSchema),
  });
  const {
    formState: { isSubmitting },
    register,
  } = form;
  const router = useRouter();

  async function handleCreate(createVolunteerEventFormData: CreateVolunteerEventFormData) {
    const volunteerEvent = await createVolunteerEvent(createVolunteerEventFormData);
    showToast(`Succesfully created ${volunteerEvent.name}.`, 'success');

    router.replace(`/volunteer-events/${volunteerEvent.slug}/edit`);
  }

  return (
    <>
      <NextSeo title="Create Volunteer Event" />
      <Form form={form} handleSubmit={handleCreate}>
        <Panel
          hideHeaderStyling
          wrapWithLoading={false}
          title={<h3 className="font-medium">Create a new volunteer event</h3>}
          footer={
            <div className="flex w-full items-center justify-between">
              <Link href="/volunteer-events" passHref>
                <Button component="a" variant="default">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" loading={isSubmitting}>
                Create
              </Button>
            </div>
          }>
          <Panel.Content className="border-t border-gray-200">
            <TextInput
              label="Name"
              placeholder="Volunteer event's name"
              layout="horizontal"
              required
              {...register('name')}
            />
          </Panel.Content>
        </Panel>
      </Form>
    </>
  );
}

NewVolunteerEventPage.getLayout = (page: React.ReactElement) => (
  <WizardLayout title="Create a new volunteer event">{page}</WizardLayout>
);
