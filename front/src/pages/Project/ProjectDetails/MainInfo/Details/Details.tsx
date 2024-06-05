import { FC } from 'react';
import Contacts from './Contacts';
import Document from './Document';
import Environment from './Environment';
import TabLink from './Link';
import TabMenu from './TabMenu';

const Details: FC = () => {
  const tabs = [
    {
      title: 'Documents',
      content: <Document />,
    },
    {
      title: 'Contacts',
      content: <Contacts />,
    },
    { title: 'Liens', content: <TabLink /> },
    { title: 'Environnements', content: <Environment /> },
    { title: 'Contrats', content: <div className="h-[2000px] bg-yellow-200">fd</div> },
  ];

  return (
    <div className="bg-white rounded-xl mb-2 border border-white-1 relative w-full h-full">
      <TabMenu tabs={tabs} />
    </div>
  );
};
export default Details;
