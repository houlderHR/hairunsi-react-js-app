import { FC } from 'react';
import Icon from '../../../shared/Icon';

type ContentItemProps = {
  item: { label: string; value: string };
  openEdit: () => void;
  onDelete: () => void;
};

const ContentItem: FC<ContentItemProps> = ({ item, openEdit, onDelete }) => (
  <div className="flex p-5  text-base flex-row items-center lg:gap-x-36 gap-x-10 w-full rounded border border-transparent hover:border-gray-9 duration-300 cursor-pointer">
    <h3 className="font-bold text-gray-9">{item.label}</h3>
    <p className="truncate">{item.value}</p>
    <div className="flex flex-row gap-4 items-center text-gray-1 ml-auto">
      <Icon
        onClick={openEdit}
        width={11.67}
        className="hover:text-secondary duration-300"
        height={15}
        name="pen"
      />
      <span className="w-px h-4 bg-gray-3" />
      <Icon
        onClick={onDelete}
        name="trash"
        className="hover:text-red-400 duration-300"
        height={15}
        width={11.67}
      />
    </div>
  </div>
);

export default ContentItem;
