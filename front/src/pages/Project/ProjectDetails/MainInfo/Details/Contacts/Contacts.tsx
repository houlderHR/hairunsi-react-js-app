import { FC } from 'react';
import AddContact from './AddContact';
import { mockClients } from './constant';
import ListContact from './ListContact';

const Contacts: FC = () => {
  const clients = mockClients;

  return (
    <div className="mb-2 relative px-[64px] pt-[30px] w-full h-full">
      <AddContact />
      <div className="pt-7 mb-5 pb-10">
        {clients.map((client) => (
          <ListContact client={client} />
        ))}
      </div>
    </div>
  );
};
export default Contacts;
