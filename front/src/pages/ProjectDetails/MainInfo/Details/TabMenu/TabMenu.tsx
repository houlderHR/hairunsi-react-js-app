import React, { FC, useState } from 'react';

type tabsType = {
    title: string, content: React.ReactNode
}

const TabMenu: FC<{tabs: tabsType[]}> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className=" p-4 h-full relative w-full">
        <div className='absolute z-40 rounded-t-xl top-0 right-0 !bg-white w-full !h-20'>
        </div>
        <div className="fixed z-50 p-1 z-50 space-x-4 bg-gray-8 rounded-xl">
                {tabs.map((tab, index) => (
                <button
                    key={index}
                    onClick={() => handleTabClick(index)}
                    className={`px-4 py-3 rounded-xl focus:outline-none ${
                    activeTab === index ? 'bg-white text-secondary-2' : 'text-gray-1'
                    }`}
                >
                    {tab.title}
                </button>
                ))}
        </div>
        <div  className=" absolute z-32 top-2 right-0 h-full w-full rounded-xl overflow-auto">
            <div className="h-full pt-[72px] ">
                {tabs[activeTab].content}
            </div>
        </div>
    </div>
  );
};

export default TabMenu;