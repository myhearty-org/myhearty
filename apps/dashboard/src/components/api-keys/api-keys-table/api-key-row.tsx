import { DuplicateIcon } from '@heroicons/react/outline';
import { Button } from '@mantine/core';
import { ApiKey } from '@myhearty/lib/types';
import { Td, Tr } from '@myhearty/ui/table';
import format from 'date-fns/format';
import { useState } from 'react';

type ApiKeyRowProps = {
  apiKey: ApiKey;
};

export function ApiKeyRow({ apiKey }: ApiKeyRowProps) {
  const { id, token, createdAt } = apiKey;

  return (
    <Tr key={id}>
      <Td>
        <RevealAndCopyToken token={token} />
      </Td>
      <Td className="whitespace-nowrap">{format(new Date(createdAt), 'd/M/yyyy, HH:mm:ss a')}</Td>
    </Tr>
  );
}

type RevealAndCopyTokenProps = {
  token: string;
};

function RevealAndCopyToken({ token }: RevealAndCopyTokenProps) {
  const [copyLabel, setCopyLabel] = useState('Copy');
  const [isHidden, setIsHidden] = useState(true);

  function onCopy(value: string) {
    navigator.clipboard.writeText(value).then(
      function () {
        setCopyLabel('Copied');
        setTimeout(() => setCopyLabel('Copy'), 3000);
      },
      function () {
        setCopyLabel('Failed to copy');
      }
    );
  }

  const hiddenPlaceholder = '**** **** **** ****';

  return (
    <div className="relative grid grid-cols-12">
      <span className="col-span-8 whitespace-nowrap font-mono">{isHidden ? hiddenPlaceholder : token}</span>
      <div className="absolute inset-y-0 right-0 col-span-4 flex items-center px-2">
        {isHidden ? (
          <Button variant="default" size="xs" onClick={() => setIsHidden(false)}>
            Reveal
          </Button>
        ) : (
          <Button
            variant="default"
            size="xs"
            leftIcon={<DuplicateIcon className="h-4 w-4 text-gray-500" />}
            onClick={() => onCopy(token)}>
            {copyLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
