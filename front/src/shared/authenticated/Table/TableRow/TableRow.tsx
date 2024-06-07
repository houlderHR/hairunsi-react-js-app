import { twMerge } from 'tailwind-merge';
import { HeaderType } from '../Table';

type TableRowProps<T> = {
  data: T;
  properties: HeaderType<T>[];
  action?: JSX.Element;
};

const isAction = (name: string) => name === '' || name.toLowerCase() === 'action';

const TableRow = <T,>({ data, properties, action }: TableRowProps<T>) => (
  <tr className="odd:bg-gray-50 even:bg-white">
    {properties.map(
      (property) =>
        !isAction(property.name) && (
          <td
            colSpan={property.width ? +property.width : 1}
            className={twMerge(
              'pl-4 py-4 w-full text-sm lg:text-base leading-6 grow text-black-1 truncate',
              property.colClassName && property.colClassName(data),
              property.className,
            )}
            key={property.associated(data).toString()}
          >
            {property.associated(data)}
          </td>
        ),
    )}
    {action && (
      <td className="py-4 text-base leading-6 grow flex items-center justify-center text-black-1 h-full truncate ">
        {action}
      </td>
    )}
  </tr>
);

export default TableRow;
