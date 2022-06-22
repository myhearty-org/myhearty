import { WizardLayout } from '@components/layouts';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mantine/core';
import { createCharitableAid } from '@myhearty/lib/organizations';
import { CreateCharitableAid, CreateCharitableAidSchema } from '@myhearty/lib/types';
import { Form, TextInput } from '@myhearty/ui/form';
import { Panel } from '@myhearty/ui/panel';
import { showToast } from '@myhearty/utils/show-toast';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

type CreateCharitableAidFormData = CreateCharitableAid;

export default function NewCharitableAidPage() {
  const form = useForm<CreateCharitableAidFormData>({
    resolver: zodResolver(CreateCharitableAidSchema),
  });
  const {
    formState: { isSubmitting },
    register,
  } = form;
  const router = useRouter();

  async function handleCreate(createCharitableAidFormData: CreateCharitableAidFormData) {
    const charitableAid = await createCharitableAid(createCharitableAidFormData);
    showToast(`Succesfully created ${charitableAid.name}.`, 'success');

    router.replace(`/aids/${charitableAid.slug}/edit`);
  }

  return (
    <>
      <NextSeo title="Create Charitable Aid" />
      <Form form={form} handleSubmit={handleCreate}>
        <Panel
          hideHeaderStyling
          wrapWithLoading={false}
          title={<h3 className="font-medium">Create a new charitable aid</h3>}
          footer={
            <div className="flex w-full items-center justify-between">
              <Link href="/aids" passHref>
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
              placeholder="Charitable aid's name"
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

NewCharitableAidPage.getLayout = (page: React.ReactElement) => (
  <WizardLayout title="Create a new charitable aid">{page}</WizardLayout>
);
