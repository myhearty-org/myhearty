import {
  Pagination as PaginationComponent,
  PaginationProps as PaginationComponentProps,
} from '@mantine/core';
import { PaginationMetadata } from '@myhearty/utils/api';

type PaginationProps = {
  paginationMetadata: PaginationMetadata;
  pageIndex: number;
  onPageIndexChange: (page: number) => void;
} & Omit<PaginationComponentProps, 'total'>;

export function Pagination({ paginationMetadata, pageIndex, onPageIndexChange, ...props }: PaginationProps) {
  const { pageSize, totalCount } = paginationMetadata;
  const pageCount = Math.ceil(totalCount / pageSize);

  return <PaginationComponent page={pageIndex} onChange={onPageIndexChange} total={pageCount} {...props} />;
}
