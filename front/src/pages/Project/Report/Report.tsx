import { useState } from 'react';
import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker';
import ProjectDailyReportLayout from '../../../shared/authenticated/ProjectDailyReportLayout';
import AddContent from '../../../shared/authenticated/ProjectDailyReportLayout/SidebarDailyReport/AddContent';
import Table from '../../../shared/authenticated/Table';
import TableRow from '../../../shared/authenticated/Table/TableRow';
import InputIcon from '../../../shared/inputs/InputIcon';
import { DailyData, DailyHeading } from './constant';

const Report = () => {
  const [value, setValue] = useState<DateValueType>({
    startDate: new Date(),
    endDate: new Date(),
  });
  const handleValueChange = (newValue: DateValueType) => {
    if (typeof newValue?.startDate === 'string' && typeof newValue?.endDate === 'string') {
      setValue(newValue);
    }
  };
  return (
    <ProjectDailyReportLayout
      title="Votre compte rendu"
      sidebarAdditionalComponent={
        <AddContent
          additionalItemContainerClass="lg:flex-row flex-col gap-y-2"
          additionalClass="lg:flex-row flex-col gap-y-2"
          title="Ajouter un collaborateur"
          itemContainerClassName="max-h-[50vh] overflow-y-auto pb-4"
        />
      }
    >
      <div className="w-full bg-white px-2 md:px-6 py-4">
        <div className="flex flex-col gap-y-4 md:flex-row gap-x-4 w-full sm:w-10/12 xl:w-7/12 ml-auto bg-white">
          <InputIcon
            placeholder="Nom"
            icon="search"
            additionalClass="bg-gray-3 border-gray-secondary border"
            additionalInputClass="py-4"
            onChange={() => {}}
          />
          <div className="border border-gray-1 w-full px-1 lg:px-4 rounded hover:border-secondary-2 cursor-pointer z-[60]">
            <Datepicker
              displayFormat="DD MMM YYYY"
              placeholder={`${new Date(Date.now()).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })} - ${new Date(Date.now()).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}`}
              useRange
              inputClassName="py-4 text-xs focus:outline-none cursor-pointer disabled w-full"
              separator="-"
              onChange={handleValueChange}
              value={value}
              primaryColor="blue"
              showFooter
              showShortcuts={false}
              i18n="fr-FR"
              configs={{
                footer: {
                  apply: 'Valider',
                  cancel: 'Annuler',
                },
              }}
            />
          </div>
        </div>
      </div>
      <div className="bg-white px-4 pt-5 mt-6 mx-4 rounded-xl border min-h-[calc(100vh-200px)] border-white-1 flex flex-col">
        <Table headers={DailyHeading}>
          {DailyData.map((_value) => (
            <TableRow properties={DailyHeading} values={_value} key={_value.id} />
          ))}
        </Table>
        <div className="flex flex-row justify-end items-center lg:gap-x-14 gap-x-1 text-xs md:text-base font-medium text-gray-1 mt-auto py-5">
          <div className="flex flex-row gap-x-5">
            <div>Ligne par page</div>
            <select className="bg-transparent" value={10}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_value) => (
                <option className="bg-gray-50 border-none" value={_value} key={_value}>
                  {_value}
                </option>
              ))}
            </select>
          </div>
          <div>1-10 de 15</div>
        </div>
      </div>
    </ProjectDailyReportLayout>
  );
};

export default Report;
