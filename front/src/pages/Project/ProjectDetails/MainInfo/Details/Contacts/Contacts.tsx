import { FC } from 'react';
import AddContact from './AddContact';

const Contacts: FC = () => (
  <div className="rounded-xl mb-2 border border-white-1 relative px-[64px] pt-[108px] w-full h-full bg-white">
    <AddContact />
  </div>
);
export default Contacts;
