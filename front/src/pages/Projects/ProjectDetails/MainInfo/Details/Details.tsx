import { FC } from 'react';
import TabMenu from './TabMenu';

const Details: FC = () => {
  const tabs = [
    { title: 'Documents', content: <div className="h-[2000px] bg-white">fd</div> },
    { title: 'Contacts', content: <div className="h-full bg-yellow-200">fd</div> },
    { title: 'Liens', content: <div className="h-[2000px] bg-green-200">fd</div> },
    { title: 'Environnements', content: <div className="h-[2000px] bg-blue-200">fd</div> },
    { title: 'Contrats', content: <div className="h-[2000px] bg-yellow-200">fd</div> },
  ];

  return (
    <div className="bg-white rounded-xl mb-2 border border-white-1 relative w-full h-full">
      <TabMenu tabs={tabs} />
    </div>
  );
};
export default Details;
