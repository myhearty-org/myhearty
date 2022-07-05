import { useCharitableAidApplications } from '@components/providers';
import { PencilAltIcon } from '@heroicons/react/solid';
import { Button } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { useCharitableAid } from '@myhearty/hooks';
import { updateCharitableAidApplication } from '@myhearty/lib/organizations';
import { CharitableAidApplication, CharitableAidApplicationStatus } from '@myhearty/lib/types';
import { DateInput, Form, Label, RadioButton, TextArea, TextInput } from '@myhearty/ui/form';
import { showToast } from '@myhearty/utils/show-toast';
import intervalToDuration from 'date-fns/intervalToDuration';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

type UpdateCharitableAidApplicationButtonProps = {
  charitableAidApplication: CharitableAidApplication;
};

export function UpdateCharitableAidApplicationButton({
  charitableAidApplication,
}: UpdateCharitableAidApplicationButtonProps) {
  const router = useRouter();
  const { slug } = router.query;

  const { mutate: mutateCharitableAid } = useCharitableAid(slug as string);
  const { mutate: mutateCharitableAidApplications } = useCharitableAidApplications();

  const modals = useModals();

  const openUpdateCharitableAidApplicationModal = () => {
    const id = modals.openModal({
      centered: true,
      title: 'Update charitable aid application',
      children: (
        <UpdateCharitableAidApplicationModal
          charitableAidApplication={charitableAidApplication}
          onClose={() => {
            modals.closeModal(id);

            mutateCharitableAid();
            mutateCharitableAidApplications();
          }}
        />
      ),
    });
  };

  return (
    <Button
      className="hover:bg-gray-200 focus:ring-0"
      variant="subtle"
      color="gray"
      size="xs"
      onClick={openUpdateCharitableAidApplicationModal}>
      <PencilAltIcon className="mr-3 h-4 w-4" />
      <span>Update</span>
    </Button>
  );
}

type UpdateCharitableAidApplicationModalProps = {
  charitableAidApplication: CharitableAidApplication;
  onClose: () => void;
};

type UpdateCharitableAidApplicationFormData = {
  status: CharitableAidApplicationStatus;
};

function UpdateCharitableAidApplicationModal({
  charitableAidApplication,
  onClose,
}: UpdateCharitableAidApplicationModalProps) {
  const form = useForm<UpdateCharitableAidApplicationFormData>();
  const {
    formState: { isSubmitting },
    register,
  } = form;

  const { t } = useTranslation('common');

  async function handleUpdate({ status }: UpdateCharitableAidApplicationFormData) {
    await updateCharitableAidApplication(charitableAidApplication.id, status);
    showToast(
      `Successfully updated ${charitableAidApplication.receiver?.name}'s charitable aid application.`,
      'success'
    );

    onClose();
  }

  return (
    <Form className="flex flex-col gap-6" form={form} handleSubmit={handleUpdate}>
      <TextInput name="name" label="Name" defaultValue={charitableAidApplication.receiver?.name} readOnly />
      <TextInput
        name="contactNo"
        label="Contact Number"
        defaultValue={charitableAidApplication.receiver?.contactNo}
        readOnly
      />
      <TextInput
        name="address"
        label="Address"
        defaultValue={charitableAidApplication.receiver?.address}
        readOnly
      />
      <DateInput
        name="birthDate"
        label="Date of Birth"
        defaultValue={charitableAidApplication.receiver?.birthDate}
        readOnly
      />
      <TextInput
        name="age"
        label="Age"
        defaultValue={
          intervalToDuration({
            start: new Date(charitableAidApplication.receiver?.birthDate!),
            end: new Date(),
          }).years
        }
        readOnly
      />
      <TextInput
        name="gender"
        label="Gender"
        defaultValue={t(`genders.${charitableAidApplication.receiver?.gender}`)}
        readOnly
      />
      <TextArea
        className="resize-none"
        name="reason"
        label="Application reason"
        defaultValue={charitableAidApplication.reason}
        readOnly
      />
      <div className="flex flex-col gap-2">
        <Label>Status</Label>
        <div className="flex gap-4">
          <RadioButton
            label="Pending"
            value="pending"
            defaultChecked={charitableAidApplication.status === 'pending'}
            {...register('status')}
          />
          <RadioButton
            label="Approved"
            value="approved"
            defaultChecked={charitableAidApplication.status === 'approved'}
            {...register('status')}
          />
          <RadioButton
            label="Rejected"
            value="rejected"
            defaultChecked={charitableAidApplication.status === 'rejected'}
            {...register('status')}
          />
        </div>
      </div>
      <Button fullWidth type="submit" loading={isSubmitting}>
        Update
      </Button>
    </Form>
  );
}
