import { CheckCircleIcon } from '@heroicons/react/solid';
import { Button, Modal } from '@mantine/core';
import { useHasMounted } from '@myhearty/hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export function DonationSuccessfulDialog() {
  const [showDialog, setShowDialog] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.query.session_id) {
      setShowDialog(true);

      const url = router.asPath.split('?')[0];
      router.replace(url, undefined, { shallow: true });
    }
  }, [router]);

  const hasMounted = useHasMounted();
  if (!hasMounted) return null;

  return (
    <Modal opened={showDialog} onClose={() => setShowDialog(false)}>
      <div className="flex flex-col items-center gap-6">
        <div className="flex">
          <CheckCircleIcon className="mr-2 h-8 w-8 flex-shrink-0 text-lime-400" />
          <span className="min-w-0 break-words text-lg font-medium">Your donation was successful!</span>
        </div>
        <Link href="/user/donations" passHref>
          <Button component="a" size="md">
            View your donation records
          </Button>
        </Link>
      </div>
    </Modal>
  );
}
