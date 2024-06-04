import { useState } from 'react';
import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker';
import useToggle from '../../../hooks/useToggle';
import DropDown from '../../../shared/authenticated/Modal/DropDown';
import ProjectDailyReportLayout from '../../../shared/authenticated/ProjectDailyReportLayout';
import Table from '../../../shared/authenticated/Table';
import TableRow from '../../../shared/authenticated/Table/TableRow';
import Icon from '../../../shared/Icon';
import InputIcon from '../../../shared/inputs/InputIcon';
import AdditionalSidebarReport from './AdditionalSidebarReport';
import { ReportData, ReportHeading, ReportType } from './constant';
import ReportDetailModal from './ReportDetailModal/ReportDetailModal';

const Report = () => {
  const { state: filterShowStatus, toggle: toggleFilterStatus } = useToggle();
  const [reportDetail, setReportDetail] = useState<ReportType>();
  const { state: showReportDetail, toggle: toggleReportDetailModal } = useToggle();
  const [value, setValue] = useState<DateValueType>({
    startDate: new Date(),
    endDate: new Date(),
  });
  const handleValueChange = (newValue: DateValueType) => {
    if (typeof newValue?.startDate === 'string' && typeof newValue?.endDate === 'string') {
      setValue(newValue);
    }
  };

  const openReportDetail = (report: ReportType) => () => {
    setReportDetail(report);
    toggleReportDetailModal();
  };

  return (
    <>
      <ProjectDailyReportLayout
        buttonName="ENREGISTRER"
        textAreaPlaceholder="Description"
        title="Votre compte rendu"
        sidebarAdditionalComponent={
          <div className="mt-4">
            <AdditionalSidebarReport />
          </div>
        }
      >
        <div className="w-full bg-white px-2 md:px-6 py-4">
          <div className="flex flex-col gap-y-4 md:flex-row gap-x-4 w-full sm:w-10/12 xl:w-7/12 ml-auto bg-white">
            <div className="relative w-full" role="presentation" onClick={toggleFilterStatus}>
              <InputIcon
                placeholder="Statut"
                endIcon={<Icon name="sharp-arrow-drop-down" />}
                additionalClass="bg-gray-3 border-gray-secondary border text-[18px]"
                additionalInputClass="py-4"
                onChange={() => {}}
              />
              {filterShowStatus && (
                <DropDown
                  items={[
                    { id: '1', name: 'blocked' },
                    { id: '2', name: 'En cours' },
                    { id: '3', name: 'Retard' },
                    { id: '4', name: 'Terminé' },
                  ]}
                />
              )}
            </div>
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
          <Table headers={ReportHeading}>
            {ReportData.map((_value) => (
              <TableRow
                properties={ReportHeading}
                data={_value}
                key={_value.description}
                action={
                  <Icon
                    name="forward"
                    className="text-gray-1 cursor-pointer hover:text-secondary-2 duration-150"
                    size={12}
                    onClick={openReportDetail(_value)}
                  />
                }
              />
            ))}
          </Table>
          <div className="flex flex-row justify-end items-center lg:gap-x-14 gap-x-1 text-xs md:text-base font-medium text-gray-1 mt-auto py-5">
            <div className="flex flex-row gap-x-5">
              <div>Ligne par page</div>
              <select className="bg-transparent" onChange={() => {}} value={10}>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_value) => (
                  <option
                    className="bg-gray-50 border-none"
                    onChange={() => {}}
                    value={_value}
                    key={_value}
                  >
                    {_value}
                  </option>
                ))}
              </select>
            </div>
            <div>1-10 de 15</div>
          </div>
        </div>
      </ProjectDailyReportLayout>
      {showReportDetail && (
        <ReportDetailModal reportDetail={reportDetail} onClose={toggleReportDetailModal} />
      )}
    </>
  );
};

export default Report;
