import { CharitableAidCard } from './charitable-aid-card';
import { LoadingResourceCard } from '@components/ui/loading';
import { useCharitableAids } from '@myhearty/hooks';
import { Pagination } from '@myhearty/ui/pagination';

export function CharitableAidsList() {
  const { charitableAids, isLoading, paginationMetadata, pageIndex, setPageIndex } = useCharitableAids();

  const isEmpty = charitableAids.length == 0;

  return (
    <div className="flex flex-col gap-3">
      {isLoading ? (
        <ul className="mx-auto grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {[...Array(3)].map((_, i) => (
            <LoadingResourceCard key={i} />
          ))}
        </ul>
      ) : (
        <>
          <ul className="mx-auto grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {isEmpty && (
              <div className="col-span-4 w-full rounded-lg border-2 border-dashed border-gray-300 p-6 text-center">
                <div className="flex flex-col gap-1">
                  <p>No charitable aids</p>
                  <p className="text-scale-1100 text-sm">Get started by creating a new charitable aid.</p>
                </div>
              </div>
            )}
            {charitableAids.map((charitableAid) => (
              <CharitableAidCard key={charitableAid.id} charitableAid={charitableAid} />
            ))}
          </ul>
          <div className="mt-1 flex items-center justify-end px-2">
            {paginationMetadata && !isEmpty && (
              <Pagination
                paginationMetadata={paginationMetadata}
                pageIndex={pageIndex}
                onPageIndexChange={setPageIndex}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
