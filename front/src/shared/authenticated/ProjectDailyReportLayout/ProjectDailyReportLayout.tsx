import { FC, PropsWithChildren } from 'react';
import SidebarDailyReport from './SidebarDailyReport';

interface ProjectDailyAccountLayoutProps {
  title: string;
  textAreaPlaceholder: string;
  buttonName: string;
  sidebarAdditionalComponent: JSX.Element;
  showSidebar?: boolean;
  closeSidebar: () => void;
}

const ProjectDailyReportLayout: FC<PropsWithChildren<ProjectDailyAccountLayoutProps>> = ({
  children,
  title,
  buttonName,
  textAreaPlaceholder,
  sidebarAdditionalComponent,
  showSidebar,
  closeSidebar,
}) => (
  <div className="h-full w-full pt-14 overflow-x-hidden">
    <SidebarDailyReport
      closeSidebar={closeSidebar}
      showSidebar={showSidebar}
      buttonName={buttonName}
      textAreaPlaceholder={textAreaPlaceholder}
      additionalComponent={sidebarAdditionalComponent}
      title={title}
    />
    <div className="lg:ml-[460px] sm:ml-52 z-0 h-full pb-6 flex flex-col ">{children}</div>
  </div>
);

export default ProjectDailyReportLayout;
