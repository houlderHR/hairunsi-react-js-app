import { FC, useState } from 'react';
import { DateValueType } from 'react-tailwindcss-datepicker';
import InputDate from '../../../inputs/InputDate';
import Button from '../../buttons/Button';
import TextArea from '../../input/TextArea';

interface SidebarDailyReportProps {
  title: string;
  additionalComponent: JSX.Element;
}

const SidebarDailyReport: FC<SidebarDailyReportProps> = ({ title, additionalComponent }) => {
  const [date, setDate] = useState<DateValueType>({
    startDate: new Date(),
    endDate: new Date(),
  });

  return (
    <div className="lg:w-[460px] w-52 bg-white border border-white-1 left-0 h-full fixed top-0 pt-16 z-[54] border-b border-gray-white-1 pb-6 px-6 flex flex-col">
      <h1 className="text-primary font-medium text-base leading-6 mb-7">{title}</h1>
      <InputDate date={date} onChange={(value) => setDate(value)} />
      <div className="mt-4">
        <TextArea classNames="lg:text-base text-xs" placeholder="Objéctifs de la journée" />
      </div>
      {additionalComponent}
      <div className="mt-auto">
        <Button title="CREER" type="submit" variant="primary" />
      </div>
    </div>
  );
};

export default SidebarDailyReport;
