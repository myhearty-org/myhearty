import { AuthDialog } from '@components/auth';
import { useAuth } from '@components/providers';
import { Button, Modal } from '@mantine/core';
import { useHasMounted } from '@myhearty/hooks';
import { UserProfile } from '@myhearty/lib/types';
import { getUserProfile, updateUserProfile } from '@myhearty/lib/users/profiles';
import {
  applyForVolunteerEvent,
  isVolunteerEventApplied,
  unapplyForVolunteerEvent,
} from '@myhearty/lib/users/volunteer-applications';
import { DateInput, Form, Label, PhoneInput, RadioButton, TextInput } from '@myhearty/ui/form';
import { handleRequest } from '@myhearty/utils/api';
import { showToast } from '@myhearty/utils/show-toast';
import formatISO from 'date-fns/formatISO';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

type ApplicationButtonProps = {
  volunteerEventId: number;
  volunteerEventName: string;
  applicationClosed: boolean;
};

enum ApplicationButtonState {
  Apply,
  Unapply,
  Closed,
}

type ApplicationButtonBehaviour = {
  text: string;
  disabled: boolean;
  onClick: () => void;
};

export function ApplicationButton({
  volunteerEventId,
  volunteerEventName,
  applicationClosed,
}: ApplicationButtonProps) {
  const auth = useAuth();
  const [buttonState, setButtonState] = useState<ApplicationButtonState>();
  const [showDialog, setShowDialog] = useState(false);

  async function unapply() {
    await unapplyForVolunteerEvent(volunteerEventId);

    showToast('Volunteer application is deleted.', 'success');
    setButtonState(ApplicationButtonState.Apply);
  }

  const buttonStates: { [key in ApplicationButtonState]: ApplicationButtonBehaviour } = {
    [ApplicationButtonState.Apply]: {
      text: 'Apply',
      disabled: false,
      onClick: () => setShowDialog(true),
    },
    [ApplicationButtonState.Unapply]: {
      text: 'Unapply',
      disabled: false,
      onClick: () => handleRequest(unapply),
    },
    [ApplicationButtonState.Closed]: {
      text: 'Application Closed',
      disabled: true,
      onClick: () => {},
    },
  };

  useEffect(() => {
    async function initializeButtonState() {
      if (applicationClosed) {
        setButtonState(ApplicationButtonState.Closed);
        return;
      }

      if (!auth.isAuthenticated) {
        setButtonState(ApplicationButtonState.Apply);
        return;
      }

      const isApplied = await isVolunteerEventApplied(volunteerEventId);

      if (isApplied) {
        setButtonState(ApplicationButtonState.Unapply);
      } else {
        setButtonState(ApplicationButtonState.Apply);
      }
    }
    handleRequest(initializeButtonState);
  }, [applicationClosed, auth.isAuthenticated, volunteerEventId]);

  const hasMounted = useHasMounted();
  if (!hasMounted) return null;

  function afterApplication() {
    setShowDialog(false);
    setButtonState(ApplicationButtonState.Unapply);
  }

  return (
    <>
      {buttonState !== undefined && (
        <Button
          fullWidth
          disabled={buttonStates[buttonState].disabled}
          onClick={buttonStates[buttonState].onClick}>
          {buttonStates[buttonState].text}
        </Button>
      )}
      {auth.isAuthenticated ? (
        <ApplicationDialogForm
          opened={showDialog}
          onClose={() => setShowDialog(false)}
          afterApplication={afterApplication}
          volunteerEventId={volunteerEventId}
          volunteerEventName={volunteerEventName}
        />
      ) : (
        <AuthDialog
          opened={showDialog}
          onClose={() => setShowDialog(false)}
          description="You need to be logged in to apply for this volunteer event."
        />
      )}
    </>
  );
}

type ApplicationDialogFormProps = {
  opened: boolean;
  onClose: () => void;
  afterApplication: () => void;
  volunteerEventId: number;
  volunteerEventName: string;
};

type ApplicationDialogFormData = UserProfile;

function ApplicationDialogForm({
  opened,
  onClose,
  afterApplication,
  volunteerEventId,
  volunteerEventName,
}: ApplicationDialogFormProps) {
  const [userProfile, setUserProfile] = useState<UserProfile>();

  useEffect(() => {
    async function populateUserProfileFields() {
      const userProfile = await getUserProfile();
      setUserProfile(userProfile);
    }
    handleRequest(populateUserProfileFields);
  }, []);

  const form = useForm<ApplicationDialogFormData>();
  const { formState, register } = form;

  async function apply({ name, contactNo, address, birthDate, gender }: ApplicationDialogFormData) {
    await updateUserProfile({ name, contactNo, address, birthDate, gender });
    await applyForVolunteerEvent(volunteerEventId);

    showToast('Volunteer application is successful.', 'success');
    afterApplication();
  }

  return (
    <Modal title={`Volunteer for ${volunteerEventName}`} opened={opened} onClose={onClose}>
      <Form className="mx-auto flex w-4/5 flex-col gap-6" form={form} handleSubmit={apply}>
        <p className="break-words text-base font-medium">Personal Information</p>
        <TextInput
          label="Name"
          defaultValue={userProfile?.name}
          maxLength={63}
          required
          {...register('name')}
        />
        <PhoneInput
          label="Contact Number"
          defaultValue={userProfile?.contactNo}
          maxLength={20}
          required
          {...register('contactNo')}
        />
        <TextInput
          label="Address"
          defaultValue={userProfile?.address}
          maxLength={255}
          required
          {...register('address')}
        />
        <DateInput
          label="Date of Birth"
          defaultValue={userProfile?.birthDate}
          max={formatISO(new Date(), { representation: 'date' })}
          required
          {...register('birthDate')}
        />
        <div className="flex flex-col gap-2">
          <Label>Gender</Label>
          <div className="flex gap-4">
            <RadioButton
              label="Male"
              value="male"
              defaultChecked={!userProfile?.gender || userProfile.gender === 'male'}
              {...register('gender')}
            />
            <RadioButton
              label="Female"
              value="female"
              defaultChecked={userProfile?.gender === 'female'}
              {...register('gender')}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit" loading={formState.isSubmitting}>
            Apply
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
