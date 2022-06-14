import { MemberRow } from './member-row';
import { useMembers } from '@components/providers';
import { ExclamationCircleIcon } from '@heroicons/react/solid';
import { Loading } from '@myhearty/ui/loading';
import { Pagination, PaginationResults } from '@myhearty/ui/pagination';
import { Table, Td, Th, Tr } from '@myhearty/ui/table';

export function MembersTable() {
  const { members, isLoading, paginationMetadata, pageIndex, setPageIndex } = useMembers();

  return (
    <Loading isLoading={isLoading}>
      <Table
        head={
          <tr>
            <Th>User ID</Th>
            <Th>Email</Th>
            <Th>Created</Th>
            <Th></Th>
          </tr>
        }
        body={
          <>
            {isLoading && (
              <Tr>
                <Td className="h-14 whitespace-nowrap text-sm leading-5 text-gray-400" colSpan={4}>
                  Retrieving member records
                </Td>
              </Tr>
            )}
            {!isLoading && members.length == 0 && (
              <Tr>
                <Td className="h-14 whitespace-nowrap text-sm leading-5 text-gray-400" colSpan={4}>
                  <div className="flex items-center opacity-80">
                    <ExclamationCircleIcon className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400" />
                    <span>No members found</span>
                  </div>
                </Td>
              </Tr>
            )}
            {members.length > 0 && (
              <>
                {members.map((member) => (
                  <MemberRow key={member.id} member={member} />
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
