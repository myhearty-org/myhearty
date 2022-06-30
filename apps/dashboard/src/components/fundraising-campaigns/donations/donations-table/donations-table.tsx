import { DonationRow } from './donation-row';
import { useDonations } from '@components/providers';
import { ExclamationCircleIcon } from '@heroicons/react/solid';
import { Loading } from '@myhearty/ui/loading';
import { Pagination, PaginationResults } from '@myhearty/ui/pagination';
import { Table, Td, Th, Tr } from '@myhearty/ui/table';

export function DonationsTable() {
  const { donations, isLoading, paginationMetadata, pageIndex, setPageIndex } = useDonations();

  return (
    <Loading isLoading={isLoading}>
      <Table
        containerClassName="mx-[-22px] lg:mx-0"
        head={
          <tr>
            <Th>Donation ID</Th>
            <Th className="text-right">Amount</Th>
            <Th className="text-right">Fee</Th>
            <Th className="text-center">Payment Method</Th>
            <Th className="text-center">Status</Th>
            <Th>Date</Th>
            <Th>Donor</Th>
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
                    <span>No donations found</span>
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
          <Pagination
            paginationMetadata={paginationMetadata}
            pageIndex={pageIndex}
            onPageIndexChange={setPageIndex}
          />
        )}
      </div>
    </Loading>
  );
}
