import React, { FC, useState } from 'react';
import TabItem from './TabItem';

type TabsType = {
  title: string;
  content: React.ReactNode;
};

const TabMenu: FC<{ tabs: TabsType[] }> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const onClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className=" p-2 xl:p-4 h-full z-20 relative w-full">
      <div className="absolute z-40 rounded-t-xl top-0 right-0 !bg-white w-full !h-20" />
      <div className="fixed z-50 p-1 lg:space-x-[2px] xl:space-x-4 bg-gray-8 rounded-xl">
        <TabItem
          id={0}
          name="Documents"
          activeTab={activeTab}
          icon="folder-solid"
          onClick={onClick}
        />
        <TabItem id={1} name="Contacts" activeTab={activeTab} icon="user" onClick={onClick} />
        <TabItem id={2} name="Liens" activeTab={activeTab} icon="link-solid" onClick={onClick} />
        <TabItem
          id={3}
          name="Environnements"
          activeTab={activeTab}
          icon="tools"
          onClick={onClick}
        />
        <TabItem id={4} name="Contrats" activeTab={activeTab} icon="pen" onClick={onClick} />
      </div>
      <div className=" absolute z-32 top-2 right-0 h-full w-full rounded-xl overflow-auto">
        <div className="h-full pt-[108px] px-4">{tabs[activeTab].content}</div>
      </div>
    </div>
  );
};

export default TabMenu;
