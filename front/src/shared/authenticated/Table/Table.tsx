import { FC, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type TableProps = {
  headers: { name: string; width?: string }[];
};

const Table: FC<PropsWithChildren<TableProps>> = ({ headers, children }) => (
  <div className="bg-white w-full">
    <div
      className={twMerge(
        'rounded-t-xl text-base bg-primary grid grid-flow-col text-white font-medium uppercase',
        `grid-cols-${headers.length}`,
      )}
    >
      {headers.map((content) => (
        <div
          className={twMerge(
            'border-r py-4 pl-4 border-l-gray-100 ',
            `${content.width ? `col-span-${content.width}` : 'col-span-1'}`,
          )}
        >
          {content.name}
        </div>
      ))}
    </div>
    {children}
  </div>
);

export default Table;
