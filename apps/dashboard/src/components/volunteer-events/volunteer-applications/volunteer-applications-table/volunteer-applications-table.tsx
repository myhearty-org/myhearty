import { VolunteerApplicationRow } from './volunteer-application-row';
import { useVolunteerApplications } from '@components/providers';
import { ExclamationCircleIcon } from '@heroicons/react/solid';
import { Loading } from '@myhearty/ui/loading';
import { Pagination, PaginationResults } from '@myhearty/ui/pagination';
import { Table, Td, Th, Tr } from '@myhearty/ui/table';

export function VolunteerApplicationsTable() {
  const { volunteerApplications, isLoading, paginationMetadata, pageIndex, setPageIndex } =
    useVolunteerApplications();

  return (
    <Loading isLoading={isLoading}>
      <Table
        containerClassName="mx-[-22px] lg:mx-0"
        head={
          <tr>
            <Th>Applicant</Th>
            <Th className="text-center">Status</Th>
            <Th>Status Update Date</Th>
            <Th className="text-center">Attendance</Th>
            <Th>Attendance Update Date</Th>
            <Th></Th>
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
