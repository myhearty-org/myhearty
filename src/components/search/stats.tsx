import { onlyWhitespace } from '@utils/common';
import { connectStats } from 'react-instantsearch-dom';

type CustomStatsProps = {
  nbHits: number;
  searchQuery: string;
};

function CustomStats({ nbHits, searchQuery }: CustomStatsProps) {
  if (!searchQuery || onlyWhitespace(searchQuery)) {
    return <div />;
  } else {
    return (
      <div className="flex max-w-full flex-grow flex-nowrap items-baseline overflow-hidden px-3 pt-5 sm:text-lg">
        <div className="whitespace-nowrap font-semibold">{nbHits.toLocaleString()} results</div>
        <div className="ml-2 flex overflow-hidden whitespace-nowrap">
          found for &ldquo;<div className="truncate">{searchQuery}</div>&rdquo;
        </div>
      </div>
    );
  }
}

export const Stats = connectStats(CustomStats);
