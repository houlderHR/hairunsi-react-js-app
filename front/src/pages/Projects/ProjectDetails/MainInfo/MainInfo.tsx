import { FC, useState } from 'react';
import Icon from '../../../../shared/Icon';
import Details from './Details';
import Header from './Header';
import SideSearch from './SideSearch';

const MainInfo: FC = () => {
  const project = {
    image: '/images/logo/panda.png',
    type: 'Regie',
    created_at: '12 Fév 2023',
    client: '  Gen - General Enterprise',
    description:
      'Ante ipsum erat quam sed aliquam sed vestibulum. Massa eget in at amet gravida. Cursu amet maecenas tortor rhoncus vitae duis. Massa quam malesuada iaculis fringilla.',
  };
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="lg:mt-5 fixed top-[105px] bottom-0 left-0 right-0 w-full px-7 pb-10 pt-5 flex gap-x-7">
      <div className="flex flex-col h-full !relative gap-y-7">
        <Header project={project} />
        <Details />
      </div>
      <div className="flex-none h-full block">
        <button
          type="button"
          onClick={toggleMenu}
          className="p-2 absolute !z-[5000] top-0 left-0 bg-blue-500 text-white rounded "
        >
          {isOpen ? <Icon name="search" /> : <Icon name="x" />}
        </button>
        <SideSearch isOpen={isOpen} />
      </div>
    </div>
  );
};

export default MainInfo;
