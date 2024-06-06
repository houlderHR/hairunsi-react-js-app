import { FC } from 'react';
import Contacts from './Contacts';
import { mockContacts } from './Contacts/constant';
import Document from './Document';
import Environment from './Environment';
import TabLink from './Link';
import TabMenu from './TabMenu';

const Details: FC = () => {
  const items = mockContacts;

  const tabs = [
    {
      title: 'Documents',
      content: <Document />,
    },
    {
      title: 'Contacts',
      content: <Contacts items={items} />,
    },
    { title: 'Liens', content: <TabLink /> },
    { title: 'Environnements', content: <Environment /> },
    { title: 'Contrats', content: <div className="h-[2000px] bg-yellow-200">fd</div> },
  ];

  return (
    <div className="bg-white rounded-xl pb-2 mb-2 border border-white-1 relative w-full h-full">
      <TabMenu tabs={tabs} />
    </div>
  );
};
export default Details;
