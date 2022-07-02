import { useVolunteerApplications } from '@components/providers';
import { PencilAltIcon } from '@heroicons/react/solid';
import { Button } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { useVolunteerEvent } from '@myhearty/hooks';
import { updateVolunteerApplication } from '@myhearty/lib/organizations';
import {
  VolunteerApplication,
  VolunteerApplicationAttendance,
  VolunteerApplicationStatus,
} from '@myhearty/lib/types';
import { DateInput, Form, Label, RadioButton, TextInput } from '@myhearty/ui/form';
import { showToast } from '@myhearty/utils/show-toast';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

type UpdateVolunteerApplicationButtonProps = {
  volunteerApplication: VolunteerApplication;
};

export function UpdateVolunteerApplicationButton({
  volunteerApplication,
}: UpdateVolunteerApplicationButtonProps) {
  const router = useRouter();
  const { slug } = router.query;

  const { mutate: mutateVolunteerEvent } = useVolunteerEvent(slug as string);
  const { mutate: mutateVolunteerApplications } = useVolunteerApplications();

  const modals = useModals();

  const openUpdateVolunteerApplicationModal = () => {
    const id = modals.openModal({
      centered: true,
      title: 'Update volunteer application',
      children: (
        <UpdateVolunteerApplicationModal
          volunteerApplication={volunteerApplication}
          onClose={() => {
            modals.closeModal(id);

            mutateVolunteerEvent();
            mutateVolunteerApplications();
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
      onClick={openUpdateVolunteerApplicationModal}>
      <PencilAltIcon className="mr-3 h-4 w-4" />
      <span>Update</span>
    </Button>
  );
}

type UpdateVolunteerApplicationModalProps = {
  volunteerApplication: VolunteerApplication;
  onClose: () => void;
};

type UpdateVolunteerApplicationFormData = {
  status: VolunteerApplicationStatus;
  attendance: VolunteerApplicationAttendance;
};

function UpdateVolunteerApplicationModal({
  volunteerApplication,
  onClose,
}: UpdateVolunteerApplicationModalProps) {
  const form = useForm<UpdateVolunteerApplicationFormData>();
  const {
    formState: { isSubmitting },
    register,
  } = form;

  const { t } = useTranslation('common');

  async function handleUpdate({ status, attendance }: UpdateVolunteerApplicationFormData) {
    await updateVolunteerApplication(volunteerApplication.id, status, attendance);
    showToast(
      `Successfully updated ${volunteerApplication.volunteer?.name}'s volunteer application.`,
      'success'
    );

    onClose();
  }

  return (
    <Form className="flex flex-col gap-6" form={form} handleSubmit={handleUpdate}>
      <TextInput name="name" label="Name" defaultValue={volunteerApplication.volunteer?.name} readOnly />
      <TextInput
        name="contactNo"
        label="Contact Number"
        defaultValue={volunteerApplication.volunteer?.contactNo}
        readOnly
      />
      <TextInput
        name="address"
        label="Address"
        defaultValue={volunteerApplication.volunteer?.address}
        readOnly
      />
      <DateInput
        name="birthDate"
        label="Date of Birth"
        defaultValue={volunteerApplication.volunteer?.birthDate}
        readOnly
      />
      <TextInput
        name="gender"
        label="Gender"
        defaultValue={t(`genders.${volunteerApplication.volunteer?.gender}`)}
        readOnly
      />
      <div className="flex flex-col gap-2">
        <Label>Status</Label>
        <div className="flex gap-4">
          <RadioButton
            label="Pending"
            value="pending"
            defaultChecked={volunteerApplication.status === 'pending'}
            {...register('status')}
          />
          <RadioButton
            label="Confirmed"
            value="confirmed"
            defaultChecked={volunteerApplication.status === 'confirmed'}
            {...register('status')}
          />
          <RadioButton
            label="Rejected"
            value="rejected"
            defaultChecked={volunteerApplication.status === 'rejected'}
            {...register('status')}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label>Attendance</Label>
        <div className="flex gap-4">
          <RadioButton
            label="Absent"
            value="absent"
            defaultChecked={volunteerApplication.attendance === 'absent'}
            {...register('attendance')}
          />
          <RadioButton
            label="Present"
            value="present"
            defaultChecked={volunteerApplication.attendance === 'present'}
            {...register('attendance')}
          />
        </div>
      </div>
      <Button fullWidth type="submit" loading={isSubmitting}>
        Update
      </Button>
    </Form>
  );
}
