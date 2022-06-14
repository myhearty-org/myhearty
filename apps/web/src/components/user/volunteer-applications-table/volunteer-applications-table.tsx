import { VolunteerApplicationRow } from './volunteer-application-row';
import { ExclamationCircleIcon } from '@heroicons/react/solid';
import { VolunteerApplication } from '@myhearty/lib/types';
import { getVolunteerApplications } from '@myhearty/lib/users/volunteer-applications';
import { Loading } from '@myhearty/ui/loading';
import { Pagination, PaginationResults } from '@myhearty/ui/pagination';
import { Table, Td, Th, Tr } from '@myhearty/ui/table';
import { handleRequest, PaginationMetadata } from '@myhearty/utils/api';
import { useEffect, useState } from 'react';

export function VolunteerApplicationsTable() {
  const [isLoading, setIsLoading] = useState(true);
  const [volunteerApplications, setVolunteerApplications] = useState<VolunteerApplication[]>([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [paginationMetadata, setPaginationMetadata] = useState<PaginationMetadata>();

  useEffect(() => {
    async function getVolunteerApplicationsData() {
      setIsLoading(true);

      try {
        const { volunteerApplications, paginationMetadata } = await getVolunteerApplications(pageIndex);

        setVolunteerApplications(volunteerApplications);
        setPaginationMetadata(paginationMetadata);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        throw error;
      }
    }
    handleRequest(getVolunteerApplicationsData);
  }, [pageIndex]);

  return (
    <Loading isLoading={isLoading}>
      <Table
        containerClassName="-mx-6 md:mx-0"
        head={
          <tr>
            <Th>Volunteer Event</Th>
            <Th>Event Date</Th>
            <Th className="text-center">Status</Th>
            <Th>Status Update Date</Th>
            <Th className="text-center">Attendance</Th>
            <Th>Attendance Update Date</Th>
          </tr>
        }
        body={
          <>
            {isLoading && (
              <Tr>
                <Td className="h-14 whitespace-nowrap text-sm leading-5 text-gray-400" colSpan={6}>
                  Retrieving volunteer application records
                </Td>
              </Tr>
            )}
            {!isLoading && volunteerApplications.length == 0 && (
              <Tr>
                <Td className="h-14 whitespace-nowrap text-sm leading-5 text-gray-400" colSpan={6}>
                  <div className="flex items-center opacity-80">
                    <ExclamationCircleIcon className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400" />
                    <span>No volunteer application records found</span>
                  </div>
                </Td>
              </Tr>
            )}
            {volunteerApplications.length > 0 && (
              <>
                {volunteerApplications.map((volunteerApplication) => (
                  <VolunteerApplicationRow
                    key={volunteerApplication.id}
                    volunteerApplication={volunteerApplication}
                  />
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
