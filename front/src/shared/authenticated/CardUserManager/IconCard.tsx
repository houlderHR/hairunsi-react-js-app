import { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import Icon from '../../Icon';

interface IconBoxProps {
  withOther?: boolean;
  isRemovable?: boolean;
  isEditable?: boolean;
  openUpdateModal: () => void;
  openDeleteModal: () => void;
}
// Icone de trash et edit de chaque Card
const IconCard: FC<IconBoxProps> = ({
  withOther,
  openUpdateModal,
  openDeleteModal,
  isRemovable,
  isEditable,
}) => (
  <div
    className={twMerge(
      'flex flex-row gap-x-4 items-center group-hover:opacity-100 duration-300 ',
      withOther ? 'opacity-0' : 'opacity-100',
    )}
  >
    {isEditable && (
      <Icon
        onClick={openUpdateModal}
        width={11.67}
        className="hover:text-secondary duration-300"
        height={15}
        name="pen"
      />
    )}
    {isRemovable && (
      <>
        {isEditable && <span className="w-px h-4 bg-gray-3" />}
        <Icon
          onClick={openDeleteModal}
          name="trash"
          className="hover:text-red-400 duration-300"
          height={15}
          width={11.67}
        />
      </>
    )}
  </div>
);

export default IconCard;
