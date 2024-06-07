import { useState } from 'react';
import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker';
import useToggle from '../../../../hooks/useToggle';
import ProjectDailyReportLayout from '../../../../shared/authenticated/ProjectDailyReportLayout';
import DropDown from '../../../../shared/authenticated/ProjectDailyReportLayout/Dropdown';
import AddContent from '../../../../shared/authenticated/ProjectDailyReportLayout/SidebarDailyReport/AddContent';
import Table from '../../../../shared/authenticated/Table';
import TableRow from '../../../../shared/authenticated/Table/TableRow';
import Icon from '../../../../shared/Icon';
import InputIcon from '../../../../shared/inputs/InputIcon';
import { DailyData, DailyDataType, DailyHeading, filterNameData } from './constant';
import DetailModal from './DetailModal';

const Daily = () => {
  const [dateFilter, setDateFilter] = useState<DateValueType>({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [nameFilter, setNameFilter] = useState<{
    id: string;
    name: string;
    email: string;
    avatar: string;
  }>();
  const [searchName, setSearchName] = useState<string>();
  const [dailyDetail, setDailyDetail] = useState<DailyDataType>();
  const [showDetail, setShowDetail] = useState(false);
  const { state: showFilterName, toggle: toggleShowFilterName } = useToggle();
  const { state: showSidebar, toggle: toggleShowSidebar } = useToggle();

  const selectFilterName = (name: { id: string; name: string; email: string; avatar: string }) => {
    setSearchName(undefined);
    setNameFilter(name);
  };

  const openDetail = (_dailyDetail: DailyDataType) => () => {
    setDailyDetail(_dailyDetail);
    setShowDetail(true);
  };

  const handleValueChange = (newValue: DateValueType) => {
    if (typeof newValue?.startDate === 'string' && typeof newValue?.endDate === 'string') {
      setDateFilter(newValue);
    }
  };

  return (
    <ProjectDailyReportLayout
      showSidebar={showSidebar}
      closeSidebar={toggleShowSidebar}
      buttonName="CREER"
      title="Objectif quotidien"
      textAreaPlaceholder="Objéctifs de la journée"
      sidebarAdditionalComponent={
        <AddContent
          additionalClass="lg:flex-row flex-col gap-y-2"
          title="Ajouter un collaborateur"
        />
      }
    >
      <div className="w-full bg-white px-2 md:px-6 py-4">
        <div className="flex gap-y-4 flex-row gap-x-4 w-full sm:w-10/12 xl:w-7/12 ml-auto bg-white">
          {!showSidebar && (
            <div
              role="presentation"
              onClick={toggleShowSidebar}
              className="p-3 max-sm:flex hidden cursor-pointer my-auto h-full rounded-l-full bg-secondary shadow text-white hover:bg-primary duration-150"
            >
              <Icon name="add" size={22} />
            </div>
          )}
          <div className="relative w-full" role="presentation" onClick={toggleShowFilterName}>
            <InputIcon
              placeholder="Nom"
              value={searchName ?? nameFilter?.name}
              icon="search"
              additionalClass="bg-gray-3 border-gray-secondary border"
              additionalInputClass="py-4"
              onChange={(e) => {
                setSearchName(e.target.value);
              }}
            />
            {showFilterName && (
              <DropDown classNames="max-h-48">
                {filterNameData
                  .filter(
                    (user) =>
                      user.name.toLowerCase().includes(searchName?.trim().toLowerCase() ?? '') ||
                      user.email.toLowerCase().includes(searchName?.trim().toLowerCase() ?? ''),
                  )
                  .map((item) => (
                    <li
                      className="px-8 cursor-pointer py-2 hover:bg-gray-50 rounded-md flex gap-x-4 flex-row"
                      key={item.id}
                      role="presentation"
                      onClick={() => selectFilterName(item)}
                    >
                      <img
                        className="w-10 h-10 rounded-full"
                        src={`/images/${item.avatar}`}
                        alt={item.avatar}
                      />
                      <div className="flex flex-col">
                        {item.name}
                        <span className="text-secondary-2 text-xs">{item.email}</span>
                      </div>
                    </li>
                  ))}
              </DropDown>
            )}
          </div>
          <div className="border border-gray-1 w-full px-1 lg:px-4 rounded hover:border-secondary-2 cursor-pointer z-[36]">
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
              value={dateFilter}
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
      <div className="bg-white px-4 pt-5 mt-6 mx-4 rounded-xl border min-h-[calc(100vh-285px)] lg:min-h-[calc(100vh-265px)] border-white-1 flex flex-col">
        <Table classNames="" headers={DailyHeading}>
          {DailyData.map((_value) => (
            <TableRow
              properties={DailyHeading}
              data={_value}
              key={_value.matricule}
              action={
                <Icon
                  name="forward"
                  onClick={openDetail(_value)}
                  className="text-gray-1 cursor-pointer hover:text-secondary-2 duration-150 xl:w-3 xl:h-3 lg:w-2.5 lg:h-2.5 w-2 h-2 mt-2"
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
      {showDetail && <DetailModal dailyDetail={dailyDetail} onClose={() => setShowDetail(false)} />}
    </ProjectDailyReportLayout>
  );
};

export default Daily;
