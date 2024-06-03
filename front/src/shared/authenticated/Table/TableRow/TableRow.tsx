import { twMerge } from 'tailwind-merge';

type TableRowProps<T extends Record<string, string | number>> = {
  values: T;
  properties: { name: string; associated: string; width?: string }[];
  action?: JSX.Element;
};

const TableRow = <T,>({
  values,
  properties,
  action,
}: TableRowProps<T extends Record<string, string | number> ? T : never>) => {
  const getPropertyWidth = (content: string) => {
    const result = properties.filter((p) => p.associated === content && p.width);
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
        <td className="py-4 text-base leading-6 grow flex items-center justify-center gap-2 text-black-1 h-full truncate ">
          {action}
        </td>
      )}
    </tr>
  );
};

export default TableRow;
