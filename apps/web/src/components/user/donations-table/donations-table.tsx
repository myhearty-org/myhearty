import { DonationRow } from './donation-row';
import { ExclamationCircleIcon } from '@heroicons/react/solid';
import { Donation } from '@myhearty/lib/types';
import { getDonations } from '@myhearty/lib/users/donations';
import { Loading } from '@myhearty/ui/loading';
import { Pagination, PaginationResults } from '@myhearty/ui/pagination';
import { Table, Td, Th, Tr } from '@myhearty/ui/table';
import { handleRequest, PaginationMetadata } from '@myhearty/utils/api';
import { useEffect, useState } from 'react';

export function DonationsTable() {
  const [isLoading, setIsLoading] = useState(true);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [paginationMetadata, setPaginationMetadata] = useState<PaginationMetadata>();

  useEffect(() => {
    async function getDonationsData() {
      setIsLoading(true);

      try {
        const { donations, paginationMetadata } = await getDonations(pageIndex);

        setDonations(donations);
        setPaginationMetadata(paginationMetadata);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        throw error;
      }
    }
    handleRequest(getDonationsData);
  }, [pageIndex]);

  return (
    <Loading isLoading={isLoading}>
      <Table
        head={
          <tr>
            <Th>Donation ID</Th>
            <Th className="text-right">Amount</Th>
            <Th className="text-right">Fee</Th>
            <Th className="text-center">Payment Method</Th>
            <Th className="text-center">Status</Th>
            <Th>Date</Th>
            <Th>Fundraising Campaign</Th>
          </tr>
        }
        body={
          <>
            {isLoading && (
              <Tr>
                <Td className="h-14 whitespace-nowrap text-sm leading-5 text-gray-400" colSpan={7}>
                  Retrieving donation records
                </Td>
              </Tr>
            )}
            {!isLoading && donations.length == 0 && (
              <Tr>
                <Td className="h-14 whitespace-nowrap text-sm leading-5 text-gray-400" colSpan={7}>
                  <div className="flex items-center opacity-80">
                    <ExclamationCircleIcon className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400" />
                    <span>No volunteer application records found</span>
                  </div>
                </Td>
              </Tr>
            )}
            {donations.length > 0 && (
              <>
                {donations.map((donation) => (
                  <DonationRow key={donation.id} donation={donation} />
                ))}
              </>
            )}
          </>
        }
      />
      <div className="mt-1 flex items-center justify-center px-2 lg:justify-between">
        <div className="hidden lg:block">
          <PaginationResults paginationMetadata={paginationMetadata} />
        </div>
        {paginationMetadata && (
          <Pagination paginationMetadata={paginationMetadata} setPageIndex={setPageIndex} />
        )}
      </div>
    </Loading>
  );
}
