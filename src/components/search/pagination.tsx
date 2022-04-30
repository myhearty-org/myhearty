import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/solid';
import { useBreakpoint } from '@hooks/index';
import { Pagination as InstantSearchPagination } from 'react-instantsearch-dom';

export function Pagination() {
  const { sm } = useBreakpoint();

  return (
    <InstantSearchPagination
      padding={sm ? 1 : 3}
      showLast
      translations={{
        first: <ChevronDoubleLeftIcon className="my-1 h-4 w-4" />,
        previous: <ChevronLeftIcon className="my-1 mx-2 h-4 w-4"/>,
        next: <ChevronRightIcon className="my-1 mx-2 h-4 w-4" />,
        last: <ChevronDoubleRightIcon className="my-1 h-4 w-4" />,
        page(currentRefinement: any) {
          return <div className="px-1">{currentRefinement}</div>;
        },
      }}
    />
  );
}
