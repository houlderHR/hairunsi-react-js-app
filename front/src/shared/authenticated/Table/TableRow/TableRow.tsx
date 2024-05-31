import { twMerge } from 'tailwind-merge';

type TableRowProps<T extends Record<string, string | number>> = {
  values: T;
  property: { name: string; associated: string; width?: string }[];
  action?: JSX.Element;
};

const TableRow = <T,>({
  values,
  property,
  action,
}: TableRowProps<T extends Record<string, string | number> ? T : never>) => {
  const getPropertyWidth = (content: string) => {
    const result = property.filter((p) => p.associated === content && p.width);
    if (result.length > 0) {
      return result[0].width ? +result[0].width : 1;
    }

    return 1;
  };

  return (
    <tr className="even:bg-gray-50 odd:bg-white">
      {Object.keys(values).map((content) => (
        <td
          colSpan={getPropertyWidth(content)}
          className={twMerge('pl-4 py-4   w-full text-base leading-6 grow text-black-1 truncate ')}
          key={content}
        >
          {values[content]}
        </td>
      ))}

      {action && (
        <td className="pl-4 py-4   w-full text-base leading-6 grow text-black-1 truncate ">
          {action}
        </td>
      )}
    </tr>
  );
};

export default TableRow;
