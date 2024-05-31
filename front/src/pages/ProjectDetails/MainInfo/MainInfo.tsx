import { FC } from 'react';
import Header from './Header';
import SideSearch from './SideSearch';

const MainInfo: FC = () => (
  <div className="pt-[150px] px-7 pb-10 flex h-full w-full text-black-200">
    <div className="w-full mr-[520px]">
      <Header image="/images/logo/panda.png" />
      <div />
    </div>
    <SideSearch />
  </div>
);

export default MainInfo;
