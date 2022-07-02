import cn from 'classnames';
import SimpleBar from 'simplebar-react';

type TableProps = {
  body: JSX.Element | JSX.Element[];
  head?: JSX.Element | JSX.Element[];
  className?: string;
  containerClassName?: string;
};

export function Table({ body, head, className, containerClassName }: TableProps) {
  return (
    <div className={containerClassName}>
      <SimpleBar className="overflow-x-auto pb-2">
        <div className="rounded shadow-sm">
          <table className={cn('w-full border-separate [border-spacing:0]', className)}>
            <thead>{head}</thead>
            <tbody>{body}</tbody>
          </table>
        </div>
      </SimpleBar>
    </div>
  );
}

type ThProps = {
  children?: React.ReactNode;
  className?: string;
} & React.HTMLProps<HTMLTableCellElement>;

export function Th({ children, className }: ThProps) {
  return (
    <th
      className={cn(
        'whitespace-nowrap border-t border-b border-gray-200 bg-gray-50 px-2 py-3 text-left text-sm text-gray-900',
        'first:rounded first:rounded-r-none first:rounded-b-none first:border-l first:pl-6',
        'last:rounded last:rounded-l-none last:rounded-b-none last:border-r last:pr-6',
        className
      )}>
      {children}
    </th>
  );
}

type TrProps = {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
};

export function Tr({ children, className, onClick }: TrProps) {
  return (
    <tr className={cn('hover:bg-gray-200', className)} onClick={onClick}>
      {children}
    </tr>
  );
}

type TdProps = {
  children: React.ReactNode;
  className?: string;
} & React.HTMLProps<HTMLTableCellElement>;

export function Td({ children, className, ...props }: TdProps) {
  return (
    <td
      className={cn(
        'border-b border-gray-200 bg-white px-2 py-3 text-sm text-gray-900',
        'first:border-l first:pl-6',
        'last:border-r last:pr-6',
        className
      )}
      {...props}>
      {children}
    </td>
  );
}
