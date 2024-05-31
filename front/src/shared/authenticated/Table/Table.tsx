import { FC, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type TableProps = {
  headers: { name: string; width?: string; associated: string }[];
};

const Table: FC<PropsWithChildren<TableProps>> = ({ headers, children }) => (
  <table className="bg-white w-full table-fixed">
    <thead className="rounded-t-md p-4">
      <tr className="bg-primary text-white rounded-t-md">
        {headers.map((content, index) => (
          <th
            colSpan={content.width ? +content.width : 1}
            className={twMerge(
              'border-r py-4 pl-4 border-l-gray-100 text-start uppercase text-base font-medium',
              `${index === 0 ? 'rounded-tl-md' : ''}`,
              `${index === headers.length - 1 ? 'rounded-tr-md whitespace-nowrap' : ''}`,
              `${content.associated === 'action' && content.name === '' ? 'w-[5%]' : ''}`,
            )}
          >
            {content.name}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>{children}</tbody>
  </table>
);

export default Table;
