import { FC } from 'react';
import AddContact from './AddContact';
import ContactsType from './constant';
import ItemContact from './ItemContact';

type ContactsProps = {
  items: ContactsType[];
};

const Contacts: FC<ContactsProps> = ({ items }) => (
  <div className="rounded-xl mb-2 border border-white-1 relative px-[64px] pt-[108px] w-full h-full overflow-y-auto">
    <AddContact />
    <div className="pt-7 mb-5">
      {items.map((item) => (
        <ItemContact label={item.client.contact.Label} contact={item.client.contact.value} />
      ))}
    </div>
  </div>
);
export default Contacts;
