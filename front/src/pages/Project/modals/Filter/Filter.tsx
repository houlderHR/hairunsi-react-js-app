import { FC, useRef, useState } from 'react';
import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker';
import Modal from '../../../../shared/authenticated/Modal';
import DropDown from '../../../../shared/authenticated/Modal/DropDown';
import Icon from '../../../../shared/Icon';
import InputIcon from '../../../../shared/inputs/InputIcon';
import { CLIENTS } from '../../constants';
import TypesProjectIncludingAll from '../TypesProjectIncludingAll';

interface IFilter {
  onClose: () => void;
}

const Filter: FC<IFilter> = ({ onClose }) => {
  const [typeValueChange, setTypeValueChage] = useState(false);
  const [showClients, setShowClients] = useState(false);
  const [searcClient, setSearchClient] = useState<string>();
  const [clientFound, setClientFound] = useState<{ name: string; id: string }>({
    name: '',
    id: '',
  });
  const [startDate, setStartDate] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });
  const [endDate, setEndDate] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });
  const [clients, setClients] = useState<{ name: string; id: string }[] | undefined>();
  const typeProject = useRef('Tout');

  const getClient = (client: { name: string; id: string }) => {
    setSearchClient(undefined);
    setClientFound(client);
  };

  const changeClientValueForSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cl = CLIENTS.filter((c) => c.name.toUpperCase().includes(e.target.value.toUpperCase()));
    setClients(cl.length > 0 ? cl : []);
    setSearchClient(e.target.value);
  };

  const handleValuesChange = () => {
    (document.getElementsByName('project') as NodeListOf<HTMLInputElement>)?.forEach((element) => {
      if (element.checked) {
        typeProject.current = element.value;
      }
    });

    const formData = new FormData();
    formData.append('type', typeProject.current);
    if (startDate && endDate && startDate.startDate !== null && endDate.startDate !== null) {
      formData.append('startDate', new Date(startDate.startDate).toDateString());
      formData.append('endDate', new Date(endDate.startDate).toDateString());
    }
    formData.append('responsible', 'searcClient ?? clientFound?.name');
    formData.append('client', searcClient ?? clientFound?.name);
  };

  return (
    <Modal onClose={onClose} title="Filtres">
      <form className="flex flex-col space-y-4" onSubmit={handleValuesChange}>
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-8 items-center justify-center">
            <div className="col-span-2 text-xl font-medium hidden 2xl:flex flex-col justify-center items-start">
              Type
            </div>
            <div className="col-span-8 2xl:col-span-6">
              <TypesProjectIncludingAll setValueType={() => setTypeValueChage((s) => !s)} />
            </div>
          </div>
          <div className="grid grid-cols-8 items-center justify-center">
            <div className="col-span-2 text-xl font-medium hidden 2xl:flex flex-col justify-center items-start">
              Date
            </div>
            <div className="col-span-8 2xl:col-span-6 grid grid-cols-2 relative gap-4">
              <div className="flex flex-row justify-between items-center rounded-md leading-3 focus:placeholder:opacity-0 focus:outline-none cursor-pointer border border-[#808080] pr-4 py-4">
                <Datepicker
                  placeholder="Date de début"
                  useRange={false}
                  asSingle
                  value={startDate}
                  onChange={(e) => setStartDate(e)}
                />
              </div>
              <div className="flex flex-row justify-between items-center rounded-md leading-3 focus:placeholder:opacity-0 focus:outline-none focus:border-secondary cursor-pointer border border-[#808080] pr-4 py-4">
                <Datepicker
                  placeholder="Date de fin"
                  useRange={false}
                  asSingle
                  minDate={
                    startDate && startDate.startDate !== null
                      ? new Date(startDate.startDate)
                      : new Date()
                  }
                  value={endDate}
                  onChange={(e) => setEndDate(e)}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-8 items-center justify-center gap-3">
            <div className="col-span-2 text-xl font-medium hidden 2xl:flex flex-col justify-center items-start">
              Responsable
            </div>
            <div className="col-span-8 2xl:col-span-6 grid grid-cols-1 relative gap-4 ">
              <InputIcon
                icon="search"
                placeholder="Responsable"
                additionalClass="border w-[100%]"
              />
            </div>
          </div>
          {!typeValueChange &&
            !(document.getElementById('Interne') as HTMLInputElement)?.checked && (
              <div className="grid grid-cols-8 items-center justify-center gap-3">
                <div className="col-span-2 text-xl font-medium hidden 2xl:flex flex-col justify-center items-start">
                  Client
                </div>
                <div
                  role="presentation"
                  className="col-span-8 2xl:col-span-6 flex flex-col justify-center relative gap-4"
                  onClick={() => setShowClients((s) => !s)}
                >
                  <InputIcon
                    icon="search"
                    placeholder="Client"
                    additionalClass="border w-[100%]"
                    value={searcClient ?? clientFound?.name}
                    onChange={(e) => changeClientValueForSearch(e)}
                  />
                  <div className="absolute w-full mt-7">
                    {showClients && <DropDown items={clients || CLIENTS} setValue={getClient} />}
                  </div>
                </div>
              </div>
            )}
        </div>
        <div className="flex flex-col relative 2xl:mb-20 mb-10">
          <div className="md:grid md:grid-cols-2 items-center  gap-4 grid grid-rows-2">
            <div
              role="presentation"
              onClick={() => {}}
              className="order-last md:order-first mt-1 px-2 py-3 text-sm border border-primary text-[#2B335B] text-[14px] rounded-md bg-white flex justify-center items-center gap-x-[0.67px] font-medium"
            >
              <Icon name="reset" height={14} width={10} className="text-[#2B335B]" />
              Réinitialiser
            </div>
            <button
              type="submit"
              className=" mt-1 px-2 py-3 text-sm border text-white text-[14px] rounded-md bg-primary"
            >
              Appliquer
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default Filter;
