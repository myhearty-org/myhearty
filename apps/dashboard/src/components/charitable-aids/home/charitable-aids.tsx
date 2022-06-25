import { CharitableAidsList } from './charitable-aids-list';
import { Button } from '@mantine/core';
import Link from 'next/link';

export function CharitableAids() {
  return (
    <div>
      <h4 className="mb-3 text-lg font-medium">Charitable Aids</h4>
      <div className="mb-4 flex items-center">
        <Link href="/aids/new" passHref>
          <Button component="a" size="xs">
            New charitable aid
          </Button>
        </Link>
      </div>
      <CharitableAidsList />
    </div>
  );
}
