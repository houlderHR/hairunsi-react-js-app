import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import Icon from '../../Icon';

export type HeaderType<T> = {
  name: string;
  associated: (data: T) => string | JSX.Element;
  width?: string;
  className?: string;
  colClassName?: (data: T) => string;
  sort?: boolean;
  sortCallback?: (direction: 'UP' | 'DOWN') => void;
};

type TableProps<T> = {
  headers: HeaderType<T>[];
  headerClassName?: string;
  classNames?: string;
};

const Table = <T,>({
  headers,
  classNames,
  headerClassName,
  children,
}: PropsWithChildren<TableProps<T>>) => (
  <table className={twMerge('bg-white w-full table-fixed', classNames)}>
    <thead className="rounded-t-md p-4">
      <tr className="bg-primary text-white rounded-t-md">
        {headers.map((header) => (
          <th
            colSpan={header.width ? +header.width : 1}
            className={twMerge(
              'border-r py-4 pl-4 pr-2 border-l-gray-100 text-start uppercase text-sm lg:text-base font-medium first:rounded-tl-md last:rounded-tr-md',
              `${header.className}`,
              headerClassName,
            )}
            key={header.name}
          >
            <div className="flex flex-row items-center justify-between">
              <span className="truncate">{header.name}</span>
              {header.sort && (
                <div className="flex flex-col">
                  <Icon
                    onClick={() => header.sortCallback && header.sortCallback('UP')}
                    className="text-white"
                    size={8}
                    name="sharp-arrow-drop-up"
                  />
                  <Icon
                    onClick={() => header.sortCallback && header.sortCallback('DOWN')}
                    className="text-white"
                    size={8}
                    name="sharp-arrow-drop-down"
                  />
                </div>
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
    <tbody>{children}</tbody>
  </table>
);

export default Table;
