import { CategoriesMultiSelect, toCategoryValues } from '@components/ui/categories-multi-select';
import { LoadingPanel } from '@components/ui/loading';
import { RichTextEditor } from '@components/ui/rich-text-editor';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mantine/core';
import { useFundraisingCampaign } from '@myhearty/hooks';
import { updateFundraisingCampaign } from '@myhearty/lib/organizations';
import { UpdateFundraisingCampaign, UpdateFundraisingCampaignSchema } from '@myhearty/lib/types';
import { DateTimeInput, Form, InputLeading, NumericInput, Switch, TextInput } from '@myhearty/ui/form';
import { Panel } from '@myhearty/ui/panel';
import { onlyPositiveInteger } from '@myhearty/utils/common';
import { showToast } from '@myhearty/utils/show-toast';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';

type UpdateFundraisingCampaignFormData = UpdateFundraisingCampaign;

export function EditFundraisingCampaignForm() {
  const router = useRouter();
  const { slug } = router.query;
  const { fundraisingCampaign, isLoading, mutate } = useFundraisingCampaign(slug as string);

  const form = useForm<UpdateFundraisingCampaignFormData>({
    resolver: zodResolver(UpdateFundraisingCampaignSchema),
  });
  const {
    formState: { isSubmitting },
    register,
    watch,
    control,
  } = form;

  if (!fundraisingCampaign) {
    return <LoadingPanel />;
  }

  async function handleUpdate(updateFundraisingCampaignFormData: UpdateFundraisingCampaignFormData) {
    const fundraisingCampaign = await updateFundraisingCampaign(
      slug as string,
      updateFundraisingCampaignFormData
    );
    showToast(`Succesfully updated ${fundraisingCampaign.name}.`, 'success');

    mutate();
  }

  const watchPublished = watch('published', fundraisingCampaign.published);

  return (
    <Form form={form} handleSubmit={handleUpdate}>
      <Panel
        isLoading={isLoading}
        title={<h3 className="font-medium">Fundraising Campaign Page</h3>}
        footer={
          <div className="flex w-full items-center justify-end gap-2">
            <Button type="submit" loading={isSubmitting}>
              Update
            </Button>
          </div>
        }>
        <Panel.Content>
          <TextInput
            layout="horizontal"
            label="Name"
            defaultValue={fundraisingCampaign.name}
            required
            readOnly={fundraisingCampaign.published}
            {...register('name')}
          />
        </Panel.Content>
        <Panel.Content className="border-t border-gray-200">
          <Controller
            control={control}
            name="categories"
            defaultValue={toCategoryValues(fundraisingCampaign.categories)}
            render={({ field: { ref, name, onChange, onBlur } }) => (
              <CategoriesMultiSelect
                ref={ref}
                name={name}
                defaultValue={fundraisingCampaign.categories}
                onChange={onChange}
                onBlur={onBlur}
                required={watchPublished}
              />
            )}
          />
        </Panel.Content>
        <Panel.Content className="border-t border-gray-200">
          <NumericInput
            layout="horizontal"
            addOnLeading={<InputLeading>RM</InputLeading>}
            label="Fundraising target amount"
            defaultValue={fundraisingCampaign.targetAmount}
            validate={onlyPositiveInteger}
            required={watchPublished}
            readOnly={fundraisingCampaign.published}
            {...register('targetAmount')}
          />
        </Panel.Content>
        <Panel.Content className="border-t border-gray-200">
          <DateTimeInput
            layout="horizontal"
            label="End date and time"
            defaultValue={fundraisingCampaign.endDatetime}
            min={new Date().toISOString()}
            required={watchPublished}
            readOnly={fundraisingCampaign.published}
            {...register('endDatetime')}
          />
        </Panel.Content>
        <Panel.Content className="border-t border-gray-200">
          <Controller
            control={control}
            name="aboutCampaign"
            defaultValue={fundraisingCampaign.aboutCampaign}
            render={({ field: { ref, onChange, onBlur } }) => (
              <RichTextEditor
                ref={ref}
                label="About the campaign"
                defaultValue={fundraisingCampaign.aboutCampaign}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
        </Panel.Content>
        <Panel.Content className="border-t border-gray-200">
          <Switch
            label="Published"
            description="Published fundraising campaign will be visible to the public."
            defaultChecked={fundraisingCampaign.published}
            disabled={fundraisingCampaign.published}
            {...register('published')}
          />
        </Panel.Content>
      </Panel>
    </Form>
  );
}
