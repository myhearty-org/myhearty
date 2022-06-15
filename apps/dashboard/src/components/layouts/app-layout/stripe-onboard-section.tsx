import { useAuth } from '@components/providers';
import { Button } from '@mantine/core';
import { useOrganization } from '@myhearty/hooks';
import { createStripeAccountLink } from '@myhearty/lib/organizations';
import { Alert } from '@myhearty/ui/alert';
import { handleRequest } from '@myhearty/utils/api';
import { useState } from 'react';

export function StripeOnboardSection() {
  const auth = useAuth();
  const { organization } = useOrganization();
  const [isLoading, setIsLoading] = useState(false);

  if (!auth.member.admin || !organization || !organization.charity || organization.stripeOnboarded) {
    return null;
  }

  async function redirectToStripeAccountLink() {
    setIsLoading(true);

    try {
      const stripeAccountLinkUrl = await createStripeAccountLink();
      window.location.href = stripeAccountLinkUrl;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Alert
        className="w-[95%]"
        severity="warning"
        title="You need to create a Stripe account to start collecting donations."
      />
      <Button
        className="w-[85%]"
        loading={isLoading}
        onClick={() => handleRequest(redirectToStripeAccountLink)}>
        Create Stripe Account
      </Button>
    </div>
  );
}
