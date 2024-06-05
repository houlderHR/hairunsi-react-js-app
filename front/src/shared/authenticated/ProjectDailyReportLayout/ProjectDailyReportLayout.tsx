import { FC, PropsWithChildren } from 'react';
import SidebarDailyReport from './SidebarDailyReport';

interface ProjectDailyAccountLayoutProps {
  title: string;
  textAreaPlaceholder: string;
  buttonName: string;
  sidebarAdditionalComponent: JSX.Element;
}

const ProjectDailyReportLayout: FC<PropsWithChildren<ProjectDailyAccountLayoutProps>> = ({
  children,
  title,
  buttonName,
  textAreaPlaceholder,
  sidebarAdditionalComponent,
}) => (
  <div className="h-full w-full pt-14 overflow-x-hidden">
    <SidebarDailyReport
      buttonName={buttonName}
      textAreaPlaceholder={textAreaPlaceholder}
      additionalComponent={sidebarAdditionalComponent}
      title={title}
    />
    <div className="lg:ml-[460px] ml-52 z-0 h-full pb-6 flex flex-col ">{children}</div>
  </div>
);

export default ProjectDailyReportLayout;
