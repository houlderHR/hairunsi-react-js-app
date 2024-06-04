import { FC, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Icon from '../../../../Icon';
import Item from './Item';

type AddContentProps = {
  title: string;
  itemContainerClassName?: string;
  additionalClass?: string;
  additionalItemContainerClass?: string;
};

const AddContent: FC<AddContentProps> = ({
  title,
  additionalClass,
  itemContainerClassName,
  additionalItemContainerClass,
}) => {
  const [itemFields, setItemFields] = useState<number[]>([]);

  const addContent = () => {
    setItemFields((i) => [...i, i.length + 1]);
  };

  const onDelete = (key: number) => () => {
    setItemFields((_items) => _items.filter((item) => item !== key));
  };

  return (
    <>
      <button
        type="button"
        onClick={addContent}
        className="rounded-lg w-full group border cursor-pointer border-dashed border-spacing-14 mt-6 border-gray-9 text-gray-1 hover:text-secondary-2 hover:border-secondary-2 hover:border-solid duration-150"
      >
        <h3
          className={twMerge(
            'text-base  flex items-center justify-center gap-x-3 py-5 text-center',
            additionalClass,
          )}
        >
          <span className="group-hover:bg-secondary-2 group-hover:text-white border rounded p-0.5">
            <Icon name="add" size={12} />
          </span>
          {title}
        </h3>
      </button>
      <div
        className={twMerge(
          'mt-8 flex flex-col gap-y-4 min-h-[40vh] max-h-[40vh] overflow-y-auto',
          itemContainerClassName,
        )}
      >
        {itemFields.map((item) => (
          <Item
            additionalClass={additionalItemContainerClass}
            onDelete={onDelete(item)}
            key={item}
          />
        ))}
      </div>
    </>
  );
};

export default AddContent;
