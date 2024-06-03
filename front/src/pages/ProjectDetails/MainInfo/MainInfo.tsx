import { FC } from 'react';
import Details from './Details';
import Header from './Header';
import SideSearch from './SideSearch';

const MainInfo: FC = () => (
  <div className="mt-[46px] xl:mt-0 xl:fixed xl:top-32 xl:bottom-0 xl:left-0 xl:right-0 w-full px-7 pb-10 pt-5 flex gap-x-7">
    <div className="flex flex-col h-full !relative gap-y-7">
      <Header image="/images/logo/panda.png" />
      <Details />
    </div>
    <div className="flex-none h-full hidden xl:block">
      <SideSearch />
    </div>
  </div>
);

export default MainInfo;
