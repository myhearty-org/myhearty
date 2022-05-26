import { CheckCircleIcon } from '@heroicons/react/solid';
import { useHasMounted } from '@myhearty/hooks';
import { Button } from '@myhearty/ui/button';
import { Dialog, DialogContent } from '@myhearty/ui/dialog';
import { useRouter } from 'next/router';

export function DonationSuccessfulDialog() {
  const { query } = useRouter();

  const hasMounted = useHasMounted();
  if (!hasMounted) return null;

  const { session_id } = query;
  if (!session_id) return null;

  return (
    <Dialog defaultOpen={true}>
      <DialogContent>
        <div className="flex flex-col items-center gap-6">
          <div className="flex">
            <CheckCircleIcon className="mr-2 h-8 w-8 flex-shrink-0 text-lime-400" />
            <span className="min-w-0 break-words text-lg font-medium">Your donation was successful!</span>
          </div>
          <Button className="w-fit justify-center" href="/user/donations" type="button" size="lg">
            View your donation records
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
