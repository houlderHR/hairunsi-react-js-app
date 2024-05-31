import { twMerge } from 'tailwind-merge';

type TableItemsProps<T extends Record<string, string | number>> = {
  values: T;
  property: { name: string; associated: string; width?: string }[];
};

const TableItems = <T,>({
  values,
  property,
}: TableItemsProps<T extends Record<string, string | number> ? T : never>) => {
  const getPropertyWidth = (content: string) => {
    const result = property.filter((p) => p.associated === content && p.width);
    if (result.length > 0) {
      return result[0].associated === content ? `col-span-${result[0].width}` : '';
    }

    return '';
  };

  return (
    <div
      className={twMerge(
        'grid grid-flow-col even:bg-gray-50 odd:bg-white  w-full',
        `grid-cols-${property.length}`,
      )}
    >
      {Object.keys(values).map((content) => (
        <div
          className={twMerge(
            'pl-4 py-4 text-base leading-6 grow text-black-1 truncate ',
            getPropertyWidth(content),
          )}
          key={content}
        >
          {values[content]}
        </div>
      ))}
    </div>
  );
};

export default TableItems;
