import { ApiKeysTable } from './api-keys-table';
import { ReloadApiKeysButton } from './reload-api-keys-button';
import { Alert } from '@myhearty/ui/alert';

export function ApiKeys() {
  return (
    <div>
      <Alert
        className="mb-2"
        severity="info"
        title="You can use an API key to access MyHearty API."
        message={
          <p>
            To access MyHearty API, you must include the API key as a Bearer token in the Authorization
            header. For example, <span className="font-mono">Authorization: Bearer &lt;your_api_key&gt;</span>
            . Currently, only the Bearer authentication scheme is supported. API docs and other
            functionalities including creating and revoking API keys will be available shortly.
          </p>
        }
      />
      <div className="mb-2 flex items-center justify-end gap-2">
        <ReloadApiKeysButton />
      </div>
      <ApiKeysTable />
    </div>
  );
}
