import { CategoriesMultiSelect, toCategoryValues } from '@components/ui/categories-multi-select';
import { LoadingPanel } from '@components/ui/loading';
import { RichTextEditor } from '@components/ui/rich-text-editor';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mantine/core';
import { useCharitableAid } from '@myhearty/hooks';
import { updateCharitableAid } from '@myhearty/lib/organizations';
import { UpdateCharitableAid, UpdateCharitableAidSchema } from '@myhearty/lib/types';
import { DateTimeInput, Form, NumericInput, Switch, TextInput } from '@myhearty/ui/form';
import { Panel } from '@myhearty/ui/panel';
import { onlyPositiveInteger } from '@myhearty/utils/common';
import { showToast } from '@myhearty/utils/show-toast';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';

type UpdateCharitableAidFormData = UpdateCharitableAid;

export function EditCharitableAidForm() {
  const router = useRouter();
  const { slug } = router.query;
  const { charitableAid, isLoading, mutate } = useCharitableAid(slug as string);

  const form = useForm<UpdateCharitableAidFormData>({
    resolver: zodResolver(UpdateCharitableAidSchema),
  });
  const {
    formState: { isSubmitting },
    register,
    watch,
    control,
  } = form;

  if (!charitableAid) {
    return <LoadingPanel />;
  }

  async function handleUpdate(updateCharitableAidFormData: UpdateCharitableAidFormData) {
    delete updateCharitableAidFormData.receiverCount;

    const charitableAid = await updateCharitableAid(slug as string, updateCharitableAidFormData);
    showToast(`Succesfully updated ${charitableAid.name}.`, 'success');

    mutate();
  }

  const watchPublished = watch('published', charitableAid.published);

  return (
    <Form form={form} handleSubmit={handleUpdate}>
      <Panel
        isLoading={isLoading}
        title={<h3 className="font-medium">Charitable Aid Page</h3>}
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
            defaultValue={charitableAid.name}
            required
            readOnly={charitableAid.published}
            {...register('name')}
          />
        </Panel.Content>
        <Panel.Content className="border-t border-gray-200">
          <Controller
            control={control}
            name="categories"
            defaultValue={toCategoryValues(charitableAid.categories)}
            render={({ field: { ref, name, onChange, onBlur } }) => (
              <CategoriesMultiSelect
                ref={ref}
                name={name}
                defaultValue={charitableAid.categories}
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
            label="Number of openings"
            defaultValue={charitableAid.openings}
            validate={onlyPositiveInteger}
            required={watchPublished}
            readOnly={charitableAid.published && new Date() > new Date(charitableAid.applicationDeadline)}
            {...register('openings')}
          />
          <input type="hidden" defaultValue={charitableAid.receiverCount} {...register('receiverCount')} />
        </Panel.Content>
        <Panel.Content className="border-t border-gray-200">
          <TextInput
            layout="horizontal"
            label="Location"
            defaultValue={charitableAid.location}
            required={watchPublished}
            readOnly={charitableAid.published && new Date() > new Date(charitableAid.applicationDeadline)}
            {...register('location')}
          />
        </Panel.Content>
        <Panel.Content className="border-t border-gray-200">
          <DateTimeInput
            layout="horizontal"
            label="Application deadline"
            defaultValue={charitableAid.applicationDeadline}
            min={new Date().toISOString()}
            required={watchPublished}
            readOnly={charitableAid.published && new Date() > new Date(charitableAid.applicationDeadline)}
            {...register('applicationDeadline')}
          />
        </Panel.Content>
        <Panel.Content className="border-t border-gray-200">
          <Controller
            control={control}
            name="aboutAid"
            defaultValue={charitableAid.aboutAid}
            render={({ field: { ref, onChange, onBlur } }) => (
              <RichTextEditor
                ref={ref}
                label="About the charitable aid"
                defaultValue={charitableAid.aboutAid}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
        </Panel.Content>
        <Panel.Content className="border-t border-gray-200">
          <Switch
            label="Published"
            description="Published charitable aid will be visible to the public."
            defaultChecked={charitableAid.published}
            disabled={charitableAid.published}
            {...register('published')}
          />
        </Panel.Content>
      </Panel>
    </Form>
  );
}
