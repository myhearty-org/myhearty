import { showToast } from './show-toast';
import { Links, parseLinkHeader } from '@web3-storage/parse-link-header';
import { AxiosResponseHeaders } from 'axios';
import { i18n } from 'next-i18next';

export function handleRequest(request: (...args: any[]) => any) {
  try {
    request();
  } catch (error) {
    const errorCode = error.response?.data?.code;

    if (errorCode) {
      const errorCodeMessage = i18n?.t([`codes.${errorCode}`, 'codes.unspecific'], { ns: 'validation' });
      showToast(errorCodeMessage!, 'error');
    } else {
      showToast('An unexpected error has occured. Please try again later.', 'error');
    }
  }
}

export type PaginationMetadata = {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  pageLinks: Links | null;
};

export function generatePaginationMetadata(headers: AxiosResponseHeaders) {
  const paginationMetadata: PaginationMetadata = {
    pageIndex: Number(headers['x-page']),
    pageSize: Number(headers['x-per-page']),
    totalCount: Number(headers['x-total']),
    pageLinks: parseLinkHeader(headers['link']),
  };

  return paginationMetadata;
}
