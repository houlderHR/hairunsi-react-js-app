import { FC } from 'react';
import IconCard from '../../../../../../../shared/authenticated/CardUserManager/IconCard';

type ItemContactProps = {
  label: string;
  contact: string;
};

const ItemContact: FC<ItemContactProps> = ({ label, contact }) => (
  <div className="flex items-center border border-transparent hover:border hover:border-secondary-3 rounded-lg px-6 py-[23px] relative">
    <div className="text-secondary-3 text-base leading-[18.38px] font-bold w-1/4">{label}</div>
    <div className="text-primary leading-[18.38px] font-normal text-base w-1/4">{contact}</div>
    <div className="absolute right-5">
      <IconCard
        iconHeight={15}
        iconWidth={15}
        additionalClassIcon="text-gray-9"
        isEditable
        isRemovable
        openUpdateModal={() => {}}
        openDeleteModal={() => {}}
      />
    </div>
  </div>
);
export default ItemContact;
