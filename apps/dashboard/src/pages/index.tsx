import { AppLayout } from '@components/layouts';
import { useOrganization } from '@myhearty/hooks';
import { Loader } from '@myhearty/ui/loader';
import { useRouter } from 'next/router';

export default function HomePage() {
  const { organization } = useOrganization();
  const router = useRouter();

  if (!organization) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <Loader text="Loading..." />
      </div>
    );
  }

  if (organization.charity) {
    router.replace('/campaigns');
  } else {
    router.replace('/volunteer-events');
  }

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Loader text="Redirecting..." />
    </div>
  );
}

HomePage.getLayout = (page: React.ReactElement) => <AppLayout>{page}</AppLayout>;
