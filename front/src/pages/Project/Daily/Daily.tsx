import ProjectDailyReportLayout from '../../../shared/authenticated/ProjectDailyReportLayout';
import Table from '../../../shared/authenticated/Table';
import TableItems from '../../../shared/authenticated/Table/TableItem';
import Icon from '../../../shared/Icon';
import InputDate from '../../../shared/inputs/InputDate';
import InputIcon from '../../../shared/inputs/InputIcon';
import { DailyData, DailyHeading } from './constant';

const Daily = () => (
  <ProjectDailyReportLayout
    title="Objectif quotidien"
    sidebarAdditionalComponent={
      <div className="rounded-lg group border border-dashed border-spacing-14 mt-6 border-gray-9 text-gray-1 hover:text-secondary-2 hover:border-secondary-2 hover:border-solid hover:rounded-sm duration-150">
        <h3 className=" cursor-default text-base  flex items-center justify-center gap-x-3 py-5 text-center">
          <span className="group-hover:bg-secondary-2 group-hover:text-white border rounded p-0.5">
            <Icon name="add" size={12} />
          </span>
          Ajouter un collaborateur
        </h3>
      </div>
    }
  >
    <div className="w-full bg-white px-6 py-4">
      <div className="flex flex-row gap-x-4 lg:w-7/12 ml-auto bg-white">
        <InputIcon
          placeholder="Nom"
          icon="search"
          additionalClass="bg-gray-3 border-gray-secondary border"
          additionalInputClass="py-4"
        />
        <InputDate additionalInputClass="py-4" />
      </div>
    </div>
    <div className="bg-white px-4 pt-5 mt-6 mx-4 rounded-t-xl border border-white-1">
      <Table headers={DailyHeading}>
        {[0, 1, 2, 3, 4, 5].map((value) => (
          <TableItems property={DailyHeading} values={DailyData} key={value} />
        ))}
      </Table>
    </div>
  </ProjectDailyReportLayout>
);

export default Daily;
