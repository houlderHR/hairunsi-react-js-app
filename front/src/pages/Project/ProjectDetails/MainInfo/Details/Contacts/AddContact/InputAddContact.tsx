import { FC, useState } from 'react';
import Icon from '../../../../../../../shared/Icon';
import Input from '../../../../../../../shared/inputs/Input';
import InputIcon from '../../../../../../../shared/inputs/InputIcon';
import ContactsType from '../constant';

interface InputAddContactProps {
    item?:ContactsType;
    onCancel?:()=>void;
    onSubmit?:()=>void;
}

const InputAddContact: FC<InputAddContactProps> = ({item,onCancel,onSubmit}) => {
  return (
        <form className="flex flex-wrap gap-y-1 lg:flex-nowrap gap-x-4 my-[2px] text-gray-1">
          {!item && <InputIcon
            icon="search"
            onChange={() => {}}
            iconColor="text-gray-10"
            additionalInputClass="placeholder:text-gray-1"
            additionalClass="rounded-md h-[56px] bg-white-2 sticky top-0 right-0 z-[500]"
            placeholder="Rechercher client"
          />}
          <Input type="text" value={ item?.client.contact.Label ?? ''} placeholder="Libellé" />
          <Input type="text" value={ item?.client.contact.value ?? ''} placeholder="Contact" />
          <div className="flex w-full lg:w-auto gap-x-4 items-center justify-center">
            <div
              role="presentation"
              className="h-6 w-6 flex justify-center items-center hover:text-secondary cursor-pointer"
              onClick={onCancel}
            >
              <Icon name="x" />
            </div>
            <div
              role="presentation"
              className="h-6 w-6 flex justify-center items-center hover:text-secondary cursor-pointer"
              onClick={onSubmit}
            >
              <Icon name="right" />
            </div>
          </div>
        </form>
  );
};
export default InputAddContact;
