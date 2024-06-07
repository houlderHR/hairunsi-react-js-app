import { FC } from 'react';
import AddContact from './AddContact';
import ContactsType from './constant';
import ItemContact from './ItemContact';

type ContactsProps = {
  items: ContactsType[];
};

const Contacts: FC<ContactsProps> = ({ items }) => (
  <div className="mb-2 relative px-[64px] pt-[36px] w-full h-full overflow-y-auto">
    <AddContact />
    <div className="pt-7 mb-5">
      {items.map((item) => (
        <ItemContact item={item} />
      ))}
    </div>
  </div>
);
export default Contacts;
