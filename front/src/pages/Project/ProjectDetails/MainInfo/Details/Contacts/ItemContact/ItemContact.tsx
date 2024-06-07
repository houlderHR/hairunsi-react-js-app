import { FC, useState } from 'react';
import IconCard from '../../../../../../../shared/authenticated/CardUserManager/IconCard';
import DeleteModal from '../../../../../../../shared/authenticated/Modal/DeleteModal';
import AddContact from '../AddContact';
import InputAddContact from '../AddContact/InputAddContact';
import ContactsType from '../constant';

interface ItemContactProps {
  item: ContactsType;
}

const ItemContact: FC<ItemContactProps> = ({ item }) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const handleShowDeleteModal = () => {
    setIsShowModal(!isShowModal);
  };
  const onUpdate = () => {
    setIsUpdate(!isUpdate);
  };
  const onCancel = () => {
    setIsUpdate(!isUpdate);
  };
  const onSubmit = () => {
    setIsUpdate(!isUpdate);
  };
  return (
    <>
      {isUpdate ? (
        <InputAddContact item={item} onCancel={onCancel} onSubmit={onSubmit} />
      ) : (
        <div className="flex items-center border border-transparent hover:border hover:border-secondary-3 rounded-lg px-6 py-[23px] relative">
          <div className="text-secondary-3 text-base leading-[18.38px] font-bold w-1/2 md:w-1/4">
            {item.client.contact.Label}
          </div>
          <div className="text-primary leading-[18.38px] font-normal text-base w-1/4 md:w-1/4 truncate">
            {item.client.contact.value}
          </div>
          <div className="absolute right-5">
            <IconCard
              iconHeight={15}
              iconWidth={15}
              additionalClassIcon="text-gray-9"
              isEditable
              isRemovable
              openUpdateModal={onUpdate}
              openDeleteModal={handleShowDeleteModal}
            />
          </div>
        </div>
      )}
      {isShowModal && (
        <DeleteModal
          description="Vous etes sur le point de supprimer un contact"
          onClose={handleShowDeleteModal}
          onDelete={() => {}}
          confirmation="Etes-vous sûr de vouloir supprimer ce contact ? 
    Attention, l’effacement est irreversible !"
          icon="delete-contact"
        />
      )}
    </>
  );
};
export default ItemContact;
