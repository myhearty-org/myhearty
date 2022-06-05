import { AuthDialog } from '@components/auth';
import { useAuth } from '@hooks';
import { Button } from '@mantine/core';
import { useHasMounted } from '@myhearty/hooks';
import { UserProfile } from '@myhearty/lib/types';
import {
  applyForCharitableAid,
  isCharitableAidApplied,
  unapplyForCharitableAid,
} from '@myhearty/lib/users/charitable-aid-applications';
import { getUserProfile, updateUserProfile } from '@myhearty/lib/users/profiles';
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '@myhearty/ui/dialog';
import { DateInput, Form, Label, PhoneInput, RadioButton, TextArea, TextInput } from '@myhearty/ui/form';
import { handleRequest } from '@myhearty/utils/api';
import { showToast } from '@myhearty/utils/show-toast';
import formatISO from 'date-fns/formatISO';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

type ApplicationButtonProps = {
  charitableAidId: number;
  charitableAidName: string;
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
  charitableAidId,
  charitableAidName,
  applicationClosed,
}: ApplicationButtonProps) {
  const auth = useAuth();
  const [buttonState, setButtonState] = useState<ApplicationButtonState>();
  const [showDialog, setShowDialog] = useState(false);

  async function unapply() {
    await unapplyForCharitableAid(charitableAidId);

    showToast('Charitable aid application is deleted.', 'success');
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

      const isApplied = await isCharitableAidApplied(charitableAidId);

      if (isApplied) {
        setButtonState(ApplicationButtonState.Unapply);
      } else {
        setButtonState(ApplicationButtonState.Apply);
      }
    }
    handleRequest(initializeButtonState);
  }, [applicationClosed, auth.isAuthenticated, charitableAidId]);

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
          fullWidth
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
          charitableAidId={charitableAidId}
          charitableAidName={charitableAidName}
        />
      ) : (
        <AuthDialog
          open={showDialog}
          onOpenChange={onDialogOpenChange}
          handleClose={() => setShowDialog(false)}
          description="You need to be logged in to apply for this charitable aid."
        />
      )}
    </>
  );
}

type ApplicationDialogFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handleClose: () => void;
  charitableAidId: number;
  charitableAidName: string;
};

type ApplicationDialogFormData = UserProfile & { reason: string };

function ApplicationDialogForm({
  open,
  onOpenChange,
  handleClose,
  charitableAidId,
  charitableAidName,
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

  async function apply({ name, contactNo, address, birthDate, gender, reason }: ApplicationDialogFormData) {
    await updateUserProfile({ name, contactNo, address, birthDate, gender });
    await applyForCharitableAid(charitableAidId, reason);

    showToast('Charitable aid application is successful.', 'success');
    handleClose();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <div className="flex flex-col gap-6">
          <DialogHeader title={`Receive aid from ${charitableAidName}`} />
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
            <TextArea
              className="resize-none"
              label="Application reason"
              rows={5}
              maxLength={2500}
              required
              {...register('reason')}
            />
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
