import { AuthDialog } from '@components/auth';
import { Button } from '@components/ui/button';
import { Dialog, DialogContent, DialogFooter } from '@components/ui/dialog';
import { Form, InputLeading, NumericField, RadioButton } from '@components/ui/form';
import { useAuth } from '@hooks/index';
import { donateForFundraisingCampaign } from '@lib/fundraising-campaigns';
import { Organization } from '@lib/types';
import { onlyPositiveInteger } from '@utils/common';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type DonationButtonProps = {
  fundraisingCampaignId: string;
  organization: Organization;
};

export function DonationButton({ fundraisingCampaignId, organization }: DonationButtonProps) {
  const auth = useAuth();
  const [showDialog, setShowDialog] = useState(false);

  function onDialogOpenChange(open: boolean) {
    if (!open) setShowDialog(false);
  }

  return (
    <>
      <Button className="w-full justify-center" onClick={() => setShowDialog(true)}>
        Donate Now
      </Button>
      {auth.isAuthenticated ? (
        <DonationDialogForm
          open={showDialog}
          onOpenChange={onDialogOpenChange}
          fundraisingCampaignId={fundraisingCampaignId}
          organization={organization}
        />
      ) : (
        <AuthDialog
          open={showDialog}
          onOpenChange={onDialogOpenChange}
          handleClose={() => setShowDialog(false)}
          description="You need to be logged in to donate for this fundraising campaign."
        />
      )}
    </>
  );
}

type DonationDialogFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fundraisingCampaignId: string;
  organization: Organization;
};

type DonationDialogFormData = {
  defaultAmount: string;
  otherAmount: string;
};

function DonationDialogForm({
  open,
  onOpenChange,
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
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
            <NumericField
              addOnLeading={<InputLeading>RM</InputLeading>}
              visible={showOtherAmountField}
              label="Other amount"
              value=""
              validate={onlyPositiveInteger}
              required={showOtherAmountField}
              {...register('otherAmount', { validate: { betweenAllowedAmounts } })}
            />
            <DialogFooter>
              <Button type="submit" loading={formState.isSubmitting}>
                Continue
              </Button>
            </DialogFooter>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
