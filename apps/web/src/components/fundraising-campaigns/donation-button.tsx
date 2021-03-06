import { AuthDialog } from '@components/auth';
import { useAuth } from '@components/providers';
import { Button, Modal } from '@mantine/core';
import { Organization } from '@myhearty/lib/types';
import { donateForFundraisingCampaign } from '@myhearty/lib/users/donations';
import { Form, InputLeading, NumericInput, RadioButton } from '@myhearty/ui/form';
import { onlyPositiveInteger } from '@myhearty/utils/common';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type DonationButtonProps = {
  fundraisingCampaignId: number;
  organization: Organization;
};

export function DonationButton({ fundraisingCampaignId, organization }: DonationButtonProps) {
  const auth = useAuth();
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <Button fullWidth onClick={() => setShowDialog(true)}>
        Donate Now
      </Button>
      {auth.isAuthenticated ? (
        <DonationDialogForm
          opened={showDialog}
          onClose={() => setShowDialog(false)}
          fundraisingCampaignId={fundraisingCampaignId}
          organization={organization}
        />
      ) : (
        <AuthDialog
          opened={showDialog}
          onClose={() => setShowDialog(false)}
          description="You need to be logged in to donate for this fundraising campaign."
        />
      )}
    </>
  );
}

type DonationDialogFormProps = {
  opened: boolean;
  onClose: () => void;
  fundraisingCampaignId: number;
  organization: Organization;
};

type DonationDialogFormData = {
  defaultAmount: string;
  otherAmount: string;
};

function DonationDialogForm({
  opened,
  onClose,
  fundraisingCampaignId,
  organization,
}: DonationDialogFormProps) {
  const form = useForm<DonationDialogFormData>();
  const { formState, register, clearErrors } = form;

  const [showOtherAmountField, setShowOtherAmountField] = useState(false);

  async function donate({ defaultAmount, otherAmount }: DonationDialogFormData) {
    const defaultAmountValue = parseInt(defaultAmount) * 100;
    const otherAmountValue = parseInt(otherAmount) * 100;
    const donationAmount = isNaN(defaultAmountValue) ? otherAmountValue : defaultAmountValue;

    const stripeCheckoutUrl = await donateForFundraisingCampaign(fundraisingCampaignId, donationAmount);
    window.location.href = stripeCheckoutUrl;
  }

  function onClickDefaultAmount() {
    clearErrors('otherAmount');
    setShowOtherAmountField(false);
  }

  function onClickOtherAmount() {
    setShowOtherAmountField(true);
  }

  function betweenAllowedAmounts(amount: string) {
    if (parseInt(amount) < 2 || parseInt(amount) > 10_000) {
      return 'Please enter an amount between RM2 and RM10,000';
    }
  }

  return (
    <Modal opened={opened} onClose={onClose}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <p className="break-words text-lg font-medium">Donation collected by {organization.name}</p>
          <p className="text-sm">
            MyHearty uses Stripe as the payment gateway. A 3% transaction fees will be charged for each
            successful donation.
          </p>
        </div>
        <Form className="mx-auto flex w-4/5 flex-col gap-6" form={form} handleSubmit={donate}>
          <div className="grid grid-cols-2 justify-center gap-4">
            <RadioButton
              label="RM25"
              value="25"
              onClick={onClickDefaultAmount}
              {...register('defaultAmount')}
            />
            <RadioButton
              label="RM50"
              value="50"
              onClick={onClickDefaultAmount}
              defaultChecked
              {...register('defaultAmount')}
            />
            <RadioButton
              label="RM100"
              value="100"
              onClick={onClickDefaultAmount}
              {...register('defaultAmount')}
            />
            <RadioButton
              label="Other amount"
              value=""
              onClick={onClickOtherAmount}
              {...register('defaultAmount')}
            />
          </div>
          <NumericInput
            addOnLeading={<InputLeading>RM</InputLeading>}
            visible={showOtherAmountField}
            label="Other amount"
            defaultValue=""
            validate={onlyPositiveInteger}
            required={showOtherAmountField}
            {...register('otherAmount', { validate: { betweenAllowedAmounts } })}
          />
          <div className="flex justify-end">
            <Button type="submit" loading={formState.isSubmitting}>
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
}
