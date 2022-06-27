import { CategoriesMultiSelect, toCategoryValues } from '@components/ui/categories-multi-select';
import { ImageUploader } from '@components/ui/image-uploader';
import { LoadingPanel } from '@components/ui/loading';
import { RichTextEditor } from '@components/ui/rich-text-editor';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mantine/core';
import { useVolunteerEvent } from '@myhearty/hooks';
import { updateVolunteerEvent } from '@myhearty/lib/organizations';
import { UpdateVolunteerEvent, UpdateVolunteerEventSchema } from '@myhearty/lib/types';
import { DateTimeInput, Form, NumericInput, Switch, TextInput } from '@myhearty/ui/form';
import { Panel } from '@myhearty/ui/panel';
import { onlyPositiveInteger } from '@myhearty/utils/common';
import { showToast } from '@myhearty/utils/show-toast';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';

type UpdateVolunteerEventFormData = UpdateVolunteerEvent;

export function EditVolunteerEventForm() {
  const router = useRouter();
  const { slug } = router.query;
  const { volunteerEvent, isLoading, mutate } = useVolunteerEvent(slug as string);

  const form = useForm<UpdateVolunteerEventFormData>({
    resolver: zodResolver(UpdateVolunteerEventSchema),
  });
  const {
    formState: { isSubmitting },
    register,
    setValue,
    watch,
    control,
  } = form;

  if (!volunteerEvent) {
    return <LoadingPanel />;
  }

  async function handleUpdate(updateVolunteerEventFormData: UpdateVolunteerEventFormData) {
    delete updateVolunteerEventFormData.volunteerCount;

    const volunteerEvent = await updateVolunteerEvent(slug as string, updateVolunteerEventFormData);
    showToast(`Succesfully updated ${volunteerEvent.name}.`, 'success');

    mutate();
  }

  const watchStartDatetime = watch('startDatetime', volunteerEvent?.startDatetime);
  const watchPublished = watch('published', volunteerEvent?.published);

  return (
    <Form form={form} handleSubmit={handleUpdate}>
      <Panel
        isLoading={isLoading}
        title={<h3 className="font-medium">Volunteer Event Page</h3>}
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
            defaultValue={volunteerEvent.name}
            required
            readOnly={volunteerEvent.published}
            {...register('name')}
          />
        </Panel.Content>
        <Panel.Content className="border-t border-gray-200">
          <Controller
            control={control}
            name="categories"
            defaultValue={toCategoryValues(volunteerEvent.categories)}
            render={({ field: { ref, name, onChange, onBlur } }) => (
              <CategoriesMultiSelect
                ref={ref}
                name={name}
                defaultValue={volunteerEvent.categories}
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
            defaultValue={volunteerEvent.openings}
            validate={onlyPositiveInteger}
            required={watchPublished}
            readOnly={volunteerEvent.published && new Date() > new Date(volunteerEvent.applicationDeadline)}
            {...register('openings')}
          />
          <input type="hidden" defaultValue={volunteerEvent.volunteerCount} {...register('volunteerCount')} />
        </Panel.Content>
        <Panel.Content className="border-t border-gray-200">
          <TextInput
            layout="horizontal"
            label="Location"
            defaultValue={volunteerEvent.location}
            required={watchPublished}
            readOnly={volunteerEvent.published && new Date() > new Date(volunteerEvent.applicationDeadline)}
            {...register('location')}
          />
        </Panel.Content>
        <Panel.Content className="border-t border-gray-200">
          <DateTimeInput
            layout="horizontal"
            label="Application deadline"
            defaultValue={volunteerEvent.applicationDeadline}
            min={new Date().toISOString()}
            max={watchStartDatetime}
            required={watchPublished}
            readOnly={volunteerEvent.published && new Date() > new Date(volunteerEvent.applicationDeadline)}
            {...register('applicationDeadline')}
          />
        </Panel.Content>
        <Panel.Content className="border-t border-gray-200">
          <DateTimeInput
            layout="horizontal"
            label="Start date and time"
            defaultValue={volunteerEvent.startDatetime}
            min={new Date().toISOString()}
            required={watchPublished}
            readOnly={volunteerEvent.published && new Date() > new Date(volunteerEvent.applicationDeadline)}
            {...register('startDatetime')}
          />
        </Panel.Content>
        <Panel.Content className="border-t border-gray-200">
          <DateTimeInput
            layout="horizontal"
            label="End date and time"
            defaultValue={volunteerEvent.endDatetime}
            min={watchStartDatetime}
            required={watchPublished}
            readOnly={volunteerEvent.published && new Date() > new Date(volunteerEvent.applicationDeadline)}
            {...register('endDatetime')}
          />
        </Panel.Content>
        <Panel.Content className="border-t border-gray-200">
          <Controller
            control={control}
            name="aboutEvent"
            defaultValue={volunteerEvent.aboutEvent}
            render={({ field: { ref, onChange, onBlur } }) => (
              <RichTextEditor
                ref={ref}
                label="About the volunteer event"
                defaultValue={volunteerEvent.aboutEvent}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
        </Panel.Content>
        <Panel.Content className="border-t border-gray-200">
          <ImageUploader
            id="volunteer-event-page"
            defaultImageData={JSON.parse(volunteerEvent.imageData)}
            defaultImageUrl={volunteerEvent.imageUrl}
            onChange={(image) => setValue('image', image)}
          />
          <input type="hidden" defaultValue={volunteerEvent.imageData} {...register('image')} />
        </Panel.Content>
        <Panel.Content className="border-t border-gray-200">
          <Switch
            label="Published"
            description="Published volunteer event will be visible to the public."
            defaultChecked={volunteerEvent.published}
            disabled={volunteerEvent.published}
            {...register('published')}
          />
        </Panel.Content>
      </Panel>
    </Form>
  );
}
