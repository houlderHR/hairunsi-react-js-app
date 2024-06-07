import { FC, useState } from 'react';
import { DateValueType } from 'react-tailwindcss-datepicker';
import { twMerge } from 'tailwind-merge';
import Icon from '../../../Icon';
import InputDate from '../../../inputs/InputDate';
import Button from '../../buttons/Button';
import TextArea from '../../input/TextArea';

interface SidebarDailyReportProps {
  title: string;
  additionalComponent: JSX.Element;
  textAreaPlaceholder: string;
  buttonName: string;
  showSidebar?: boolean;
  closeSidebar: () => void;
}

const SidebarDailyReport: FC<SidebarDailyReportProps> = ({
  title,
  additionalComponent,
  textAreaPlaceholder,
  buttonName,
  showSidebar,
  closeSidebar,
}) => {
  const [date, setDate] = useState<DateValueType>({
    startDate: new Date(),
    endDate: new Date(),
  });

  return (
    <div
      className={twMerge(
        'lg:w-[460px] sm:w-52 translate-x-0 bg-white border border-white-1 left-0 h-full fixed top-0 pt-36 z-[39] border-b border-gray-white-1 pb-6 px-6 duration-200 flex flex-col',
        showSidebar ? 'w-full translate-x-0' : 'max-sm:-translate-x-full',
      )}
    >
      <h1 className="text-primary font-medium text-base leading-6 mb-7 flex flex-row justify-between items-center">
        {title}
        <Icon name="x" onClick={closeSidebar} className="sm:hidden cursor-pointer" />
      </h1>
      <InputDate date={date} onChange={(value) => setDate(value)} />
      <div className="mt-4">
        <TextArea classNames="lg:text-base text-xs" placeholder={textAreaPlaceholder} />
      </div>
      {additionalComponent}
      <div className="mt-auto">
        <Button title={buttonName} type="submit" variant="primary" />
      </div>
    </div>
  );
};

export default SidebarDailyReport;
