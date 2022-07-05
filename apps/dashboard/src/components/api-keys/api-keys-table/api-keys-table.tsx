import { ApiKeyRow } from './api-key-row';
import { ExclamationCircleIcon } from '@heroicons/react/solid';
import { useApiKeys } from '@myhearty/hooks';
import { Loading } from '@myhearty/ui/loading';
import { Table, Td, Th, Tr } from '@myhearty/ui/table';

export function ApiKeysTable() {
  const { apiKeys, isLoading } = useApiKeys();

  return (
    <Loading isLoading={isLoading}>
      <Table
        className="table-auto lg:table-fixed"
        containerClassName="mx-[-22px] lg:mx-0"
        head={
          <tr>
            <Th className="w-[70%]">API key</Th>
            <Th>Created</Th>
          </tr>
        }
        body={
          <>
            {isLoading && (
              <Tr>
                <Td className="h-14 whitespace-nowrap text-sm leading-5 text-gray-400" colSpan={2}>
                  Retrieving API keys
                </Td>
              </Tr>
            )}
            {!isLoading && apiKeys.length == 0 && (
              <Tr>
                <Td className="h-14 whitespace-nowrap text-sm leading-5 text-gray-400" colSpan={2}>
                  <div className="flex items-center opacity-80">
                    <ExclamationCircleIcon className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400" />
                    <span>No API keys found</span>
                  </div>
                </Td>
              </Tr>
            )}
            {apiKeys.length > 0 && (
              <>
                {apiKeys.map((apiKey) => (
                  <ApiKeyRow key={apiKey.id} apiKey={apiKey} />
                ))}
              </>
            )}
          </>
        }
      />
    </Loading>
  );
}
