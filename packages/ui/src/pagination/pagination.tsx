import {
  Pagination as PaginationComponent,
  PaginationProps as PaginationComponentProps,
} from '@mantine/core';
import { PaginationMetadata } from '@myhearty/utils/api';
import { Dispatch, SetStateAction } from 'react';

type PaginationProps = {
  paginationMetadata: PaginationMetadata;
  setPageIndex: Dispatch<SetStateAction<number>>;
} & Omit<PaginationComponentProps, 'total'>;

export function Pagination({ paginationMetadata, setPageIndex, ...props }: PaginationProps) {
  const { pageIndex, pageSize, totalCount } = paginationMetadata;
  const pageCount = Math.ceil(totalCount / pageSize);

  return <PaginationComponent page={pageIndex} onChange={setPageIndex} total={pageCount} {...props} />;
}
