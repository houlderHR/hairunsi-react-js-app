import { FC } from 'react';
import Header from './Header';
import SideSearch from './SideSearch';
import Details from './Details';

const MainInfo: FC = () => (
  <div className="fixed top-32 bottom-0 left-0 right-0 w-full px-7 pb-10 pt-5 flex gap-x-7 overflow-auto">
    <div className="flex flex-col gap-y-7">
      <Header image="/images/logo/panda.png" />
      <Details/>
    </div>
    <div className="flex-none h-full hidden xl:block">
      <SideSearch />
    </div>
  </div>
);

export default MainInfo;
