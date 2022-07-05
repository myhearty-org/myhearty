import { ApiKeys } from '@components/api-keys';
import { AppLayout } from '@components/layouts';
import { NextSeo } from 'next-seo';

export default function ApiKeysPage() {
  return (
    <AppLayout>
      <NextSeo title="API keys" />
      <div className="px-4 py-2">
        <ApiKeys />
      </div>
    </AppLayout>
  );
}
