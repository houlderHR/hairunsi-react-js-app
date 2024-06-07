import { useState } from 'react';
import { DateValueType } from 'react-tailwindcss-datepicker';
import Button from '../../../../../../shared/authenticated/buttons/Button';
import Table from '../../../../../../shared/authenticated/Table';
import TableRow from '../../../../../../shared/authenticated/Table/TableRow';
import Icon from '../../../../../../shared/Icon';
import InputDate from '../../../../../../shared/inputs/InputDate';
import { ContractData, ContractHeading } from './constant';

const Contract = () => {
  const [date, setDate] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });

  return (
    <div className="px-5 pt-8">
      <div className="grid xl:gap-x-40 lg:gap-x-10 2xl:gap-x-96 lg:grid-cols-2 max-lg:gap-y-2 grid-cols-1">
        <Button
          classTitle="max-lg:inline-block max-xl:hidden"
          onClick={() => {}}
          icon="add"
          title="CREER UN NOUVEAU CONTRAT"
          variant="secondary"
        />
        <div className="flex flex-row gap-x-4">
          <InputDate placeholder="Début" date={date} onChange={(value) => setDate(value)} />
          <InputDate placeholder="Fin" date={date} onChange={(value) => setDate(value)} />
        </div>
      </div>
      <div className="bg-white px-4 pt-5 mt-6 rounded-xl border border-white-1 flex flex-col">
        <Table headers={ContractHeading}>
          {ContractData.map((_value) => (
            <TableRow
              properties={ContractHeading}
              data={_value}
              key={_value.description}
              action={
                <div className="grid grid-cols-4 2xl:gap-x-7 gap-x-4 w-full md:px-4 justify-start items-center">
                  <Icon
                    name="reload"
                    className="text-gray-1 cursor-pointer hover:text-secondary-2 duration-150"
                    height={22}
                    width={16}
                    onClick={() => {}}
                  />
                  <Icon
                    name="resilier"
                    className="text-gray-1 cursor-pointer hover:text-red-400 duration-150"
                    height={20}
                    width={20}
                    onClick={() => {}}
                  />
                  <Icon
                    name="pen"
                    className="text-gray-1 cursor-pointer hover:text-secondary-2 duration-150"
                    height={14}
                    width={14}
                    onClick={() => {}}
                  />
                  <Icon
                    name="x"
                    className="text-gray-1 cursor-pointer hover:text-red-500 duration-150"
                    height={14}
                    width={14}
                    onClick={() => {}}
                  />
                </div>
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
    </div>
  );
};

export default Contract;
