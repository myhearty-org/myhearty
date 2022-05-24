import { AuthDialog } from '@components/auth';
import { Button } from '@components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '@components/ui/dialog';
import { DateInput, Form, Label, PhoneInput, RadioButton, TextField } from '@components/ui/form';
import { useHasMounted } from '@hooks/index';
import { useAuth } from '@hooks/index';
import { UserProfile } from '@lib/types';
import { getUserProfile, updateUserProfile } from '@lib/users/profiles';
import {
  applyForVolunteerEvent,
  isVolunteerEventApplied,
  unapplyForVolunteerEvent,
} from '@lib/volunteer-events';
import { handleRequest } from '@utils/api';
import { showToast } from '@utils/show-toast';
import formatISO from 'date-fns/formatISO';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

type ApplicationButtonProps = {
  volunteerEventId: string;
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

export function ApplicationButton({ volunteerEventId, volunteerEventName, applicationClosed }: ApplicationButtonProps) {
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

  function onDialogOpenChange(open: boolean) {
    if (!open) setShowDialog(false);
  }

  function handleApplicationDialogFormClose() {
    setShowDialog(false);
    setButtonState(ApplicationButtonState.Unapply);
  }

  return (
    <>
      {buttonState !== undefined && (
        <Button
          className="w-full justify-center"
          disabled={buttonStates[buttonState].disabled}
          onClick={buttonStates[buttonState].onClick}>
          {buttonStates[buttonState].text}
        </Button>
      )}
      {auth.isAuthenticated ? (
        <ApplicationDialogForm
          open={showDialog}
          onOpenChange={onDialogOpenChange}
          handleClose={handleApplicationDialogFormClose}
          volunteerEventId={volunteerEventId}
          volunteerEventName={volunteerEventName}
        />
      ) : (
        <AuthDialog
          open={showDialog}
          onOpenChange={onDialogOpenChange}
          handleClose={() => setShowDialog(false)}
          description="You need to be logged in to apply for this volunteer event."
        />
      )}
    </>
  );
}

type ApplicationDialogFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handleClose: () => void;
  volunteerEventId: string;
  volunteerEventName: string;
};

type ApplicationDialogFormData = UserProfile;

function ApplicationDialogForm({ open, onOpenChange, handleClose, volunteerEventId, volunteerEventName }: ApplicationDialogFormProps) {
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

  async function apply({ name, contact_no, address, birth_date, gender }: ApplicationDialogFormData) {
    await updateUserProfile({ name, contact_no, address, birth_date, gender });
    await applyForVolunteerEvent(volunteerEventId);

    showToast('Volunteer application is successful.', 'success');
    handleClose();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <div className="flex flex-col gap-6">
          <DialogHeader title={`Volunteer for ${volunteerEventName}`} />
          <Form className="mx-auto flex w-4/5 flex-col gap-6" form={form} handleSubmit={apply}>
            <p className="break-words text-base font-medium">Personal Information</p>
            <TextField
              label="Name"
              defaultValue={userProfile?.name}
              maxLength={63}
              required
              {...register('name')}
            />
            <PhoneInput
              label="Contact Number"
              defaultValue={userProfile?.contact_no}
              maxLength={20}
              required
              {...register('contact_no')}
            />
            <TextField
              label="Address"
              defaultValue={userProfile?.address}
              maxLength={255}
              required
              {...register('address')}
            />
            <DateInput
              label="Date of Birth"
              defaultValue={userProfile?.birth_date}
              max={formatISO(new Date(), { representation: 'date' })}
              required
              {...register('birth_date')}
            />
            <div className="flex flex-col gap-2">
              <Label>Gender</Label>
              <div className="flex gap-4">
                <RadioButton
                  label="Male"
                  value="male"
                  defaultChecked={userProfile?.gender === 'male'}
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
            <DialogFooter>
              <Button type="submit" loading={formState.isSubmitting}>
                Apply
              </Button>
            </DialogFooter>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
