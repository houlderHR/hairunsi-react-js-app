import { FC, PropsWithChildren } from 'react';

interface UserAuthenticationProps {
  title: string;
  subTitle?: string;
}

const UserAuthentication: FC<PropsWithChildren<UserAuthenticationProps>> = ({
  title,
  subTitle,
  children,
}) => (
  <div className="grid md:grid-cols-[30%_70%] md:px-0 px-4 h-full min-h-screen">
    <div className="bg-primary h-full relative md:flex flex-col hidden">
      <img
        src="images/background/bg-only-left.png"
        alt="background"
        className="absolute z-0 w-full h-full top-0 left-0 bg-cover right-0 bg-no-repeat"
      />
      <div className="z-10 mt-auto xl:mb-80 mb-52 text-white mx-5 xl:mx-[77px]">
        <h3 className="text-[54px] leading-[60px] font-normal">{title}</h3>
        {subTitle && <span className="text-base mt-1 leading-2">{subTitle}</span>}
      </div>
    </div>
    <div className="flex w-full flex-col items-center justify-center">{children}</div>
  </div>
);

export default UserAuthentication;
