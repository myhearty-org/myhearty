import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/solid';
import { Modal } from '@mantine/core';
import { Loader } from '@myhearty/ui/loader';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function StripeOnboardingResultPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.query.success === '') {
      setIsSuccess(true);
      setTimeout(() => router.replace('/'), 2500);
    } else if (router.query.failed === '') {
      setIsFailed(true);
      setTimeout(() => router.replace('/'), 2500);
    }
  }, [router]);

  return (
    <>
      {!isSuccess && !isFailed && (
        <div className="flex h-screen flex-col items-center justify-center">
          <Loader text="Loading..." />
        </div>
      )}
      <Modal
        overlayOpacity={0}
        overflow="outside"
        opened={isSuccess}
        onClose={() => {}}
        withCloseButton={false}>
        <div className="flex flex-col items-center justify-center">
          <CheckCircleIcon className="mr-2 h-8 w-8 flex-shrink-0 text-lime-400" />
          <span className="min-w-0 break-words text-center text-lg font-medium">
            Your organization has been successfully linked to Stripe.
          </span>
        </div>
      </Modal>
      <Modal
        overlayOpacity={0}
        overflow="outside"
        opened={isFailed}
        onClose={() => {}}
        withCloseButton={false}>
        <div className="flex flex-col items-center justify-center">
          <XCircleIcon className="mr-2 h-8 w-8 flex-shrink-0 text-red-400" />
          <span className="min-w-0 break-words text-center text-lg font-medium">
            Your organization has not been linked to Stripe. <br />
            Please try again later.
          </span>
        </div>
      </Modal>
    </>
  );
}
