import { FC, useState } from 'react';
import Icon from '../../../../../../shared/Icon';
import ClientType from './constant';
import ItemContact from './ItemContact';

const ListContact: FC<{ client: ClientType }> = ({ client }) => {
  const [showContact, setShowContact] = useState(true);
  const handleShowContact = () => {
    setShowContact(!showContact);
  };
  return (
    <div
      className={`mb-2 pt-3  pb-1 px-2 border rounded-lg border-transparent transition transform ${
        !showContact && '!border-secondary-3 !border  rounded-lg'
      }`}
    >
      <div
        role="presentation"
        className="flex text-secondary-2 font-bold transition ease-in-out duration-500 gap-4 mb-2 items-center cursor-pointer"
        onClick={handleShowContact}
      >
        <span className="">{client.name}</span>
        {showContact ? <Icon name="sharp-arrow-drop-down " /> : <Icon name="sharp-arrow-drop-up" />}
      </div>

      {showContact && client.contact.map((contact) => <ItemContact item={contact} />)}
    </div>
  );
};
export default ListContact;
