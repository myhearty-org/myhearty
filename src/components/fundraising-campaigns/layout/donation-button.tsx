import { Button } from '@components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter } from '@components/ui/dialog';
import { Form, InputLeading, NumericField, RadioButton } from '@components/ui/form';
import { XIcon } from '@heroicons/react/outline';
import { donateForFundraisingCampaign } from '@lib/fundraising-campaigns';
import { Organization } from '@lib/types';
import { onlyPositiveInteger } from '@utils/common';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type DonationFormProps = {
  fundraisingCampaignId: string;
  organization: Organization;
};

type DonationFormData = {
  defaultAmount: string;
  otherAmount: string;
};

function DonationForm({ fundraisingCampaignId, organization }: DonationFormProps) {
  const form = useForm<DonationFormData>();
  const { formState, register, clearErrors } = form;

  const [showOtherAmountField, setShowOtherAmountField] = useState(false);

  async function donate({ defaultAmount, otherAmount }: DonationFormData) {
    const defaultAmountValue = parseInt(defaultAmount) * 100;
    const otherAmountValue = parseInt(otherAmount) * 100;
    const donationAmount = isNaN(defaultAmountValue) ? otherAmountValue : defaultAmountValue;

    const { data } = await donateForFundraisingCampaign(fundraisingCampaignId, donationAmount);
    window.location.href = data.stripe_checkout_url;
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
  );
}

type DonationButtonProps = {
  fundraisingCampaignId: string;
  organization: Organization;
};

export function DonationButton({ fundraisingCampaignId, organization }: DonationButtonProps) {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <Button className="w-full justify-center" onClick={() => setShowDialog(true)}>
        Donate Now
      </Button>
      <Dialog open={showDialog} onOpenChange={(isOpen) => !isOpen && setShowDialog(false)}>
        <DialogContent>
          <DonationForm fundraisingCampaignId={fundraisingCampaignId} organization={organization} />
          <DialogClose asChild>
            <XIcon className="absolute top-2.5 right-2.5 h-6 w-6 cursor-pointer text-gray-400 hover:text-gray-500" />
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
}
