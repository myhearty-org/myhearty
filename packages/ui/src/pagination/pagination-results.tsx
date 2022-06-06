import { PaginationMetadata } from '@myhearty/utils/api';

type PaginationResultsProps = {
  paginationMetadata?: PaginationMetadata;
};

export function PaginationResults({ paginationMetadata }: PaginationResultsProps) {
  if (!paginationMetadata) {
    return (
      <p className="text-sm text-gray-500">
        Showing <span className="px-1 font-medium text-gray-900">0</span> results
      </p>
    );
  }

  const { pageIndex, pageSize, totalCount } = paginationMetadata;
  const fromRow = Math.min((pageIndex - 1) * pageSize + 1, totalCount);
  const toRow = Math.min(pageIndex * pageSize, totalCount);

  return (
    <p className="text-sm text-gray-500">
      Showing
      <span className="px-1 font-medium text-gray-900">{fromRow}</span>
      to
      <span className="px-1 font-medium text-gray-900">{toRow}</span>
      of
      <span className="px-1 font-medium text-gray-900">{totalCount}</span>
      results
    </p>
  );
}
