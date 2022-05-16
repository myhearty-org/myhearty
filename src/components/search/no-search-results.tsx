import { connectStats } from 'react-instantsearch-dom';

type NoSearchResultsComponentProps = {
  searchQuery: string;
  nbHits: number;
};

function NoSearchResultsComponent({ searchQuery, nbHits }: NoSearchResultsComponentProps) {
  if (nbHits) {
    return null;
  } else {
    return (
      <div className="flex w-full justify-center rounded border border-dashed border-gray-300 bg-white py-12 px-4">
        <div className="flex flex-col items-center self-center py-10 text-center sm:py-20">
          <div className="mt-6 mb-2 text-lg text-gray-700">
            Sorry, MyHearty doesn&apos;t have any resources on <b>&ldquo;{searchQuery}&rdquo;</b>
          </div>
          <div className="text-gray-500">Please try to search again with other keywords.</div>
        </div>
      </div>
    );
  }
}

export const NoSearchResults = connectStats(NoSearchResultsComponent);
