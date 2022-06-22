import { WizardLayout } from '@components/layouts';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mantine/core';
import { createFundraisingCampaign } from '@myhearty/lib/organizations';
import { CreateFundraisingCampaign, CreateFundraisingCampaignSchema } from '@myhearty/lib/types';
import { Form, TextInput } from '@myhearty/ui/form';
import { Panel } from '@myhearty/ui/panel';
import { showToast } from '@myhearty/utils/show-toast';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

type CreateFundraisingCampaignFormData = CreateFundraisingCampaign;

export default function NewFundraisingCampaignPage() {
  const form = useForm<CreateFundraisingCampaignFormData>({
    resolver: zodResolver(CreateFundraisingCampaignSchema),
  });
  const {
    formState: { isSubmitting },
    register,
  } = form;
  const router = useRouter();

  async function handleCreate(createFundraisingCampaignFormData: CreateFundraisingCampaignFormData) {
    const fundraisingCampaign = await createFundraisingCampaign(createFundraisingCampaignFormData);
    showToast(`Succesfully created ${fundraisingCampaign.name}.`, 'success');

    router.replace(`/campaigns/${fundraisingCampaign.slug}/edit`);
  }

  return (
    <>
      <NextSeo title="Create Fundraising Campaign" />
      <Form form={form} handleSubmit={handleCreate}>
        <Panel
          hideHeaderStyling
          wrapWithLoading={false}
          title={<h3 className="font-medium">Create a new fundraising campaign</h3>}
          footer={
            <div className="flex w-full items-center justify-between">
              <Link href="/campaigns" passHref>
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
              placeholder="Fundraising campaign's name"
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

NewFundraisingCampaignPage.getLayout = (page: React.ReactElement) => (
  <WizardLayout title="Create a new fundraising campaign">{page}</WizardLayout>
);
