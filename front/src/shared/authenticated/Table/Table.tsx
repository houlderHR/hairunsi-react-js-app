import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import Icon from '../../Icon';

export type HeaderType<T> = {
  name: string;
  associated: (data: T) => string;
  width?: string;
  className?: string;
  colClassName?: (data: T) => string;
};

type TableProps<T> = {
  headers: HeaderType<T>[];
};

const Table = <T,>({ headers, children }: PropsWithChildren<TableProps<T>>) => (
  <table className="bg-white w-full table-fixed">
    <thead className="rounded-t-md p-4">
      <tr className="bg-primary text-white rounded-t-md">
        {headers.map((header) => (
          <th
            colSpan={header.width ? +header.width : 1}
            className={twMerge(
              'border-r py-4 pl-4 pr-2 border-l-gray-100 text-start uppercase text-base font-medium first:rounded-tl-md last:rounded-tr-md truncate',
              `${header.className}`,
            )}
            key={header.name}
          >
            <div className="flex flex-row items-center justify-between">
              {header.name}
              <div className="flex flex-col">
                <Icon className="text-white" size={8} name="sharp-arrow-drop-up" />
                <Icon className="text-white" size={8} name="sharp-arrow-drop-down" />
              </div>
            </div>
          </th>
        ))}
      </tr>
    </thead>
    <tbody>{children}</tbody>
  </table>
);

export default Table;
