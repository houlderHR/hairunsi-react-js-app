import { FC, PropsWithChildren, useState } from 'react';
import { DateValueType } from 'react-tailwindcss-datepicker';
import Button from '../../../../../../../shared/authenticated/buttons/Button';
import Modal from '../../../../../../../shared/authenticated/Modal';
import DropDown from '../../../../../../../shared/authenticated/Modal/DropDown';
import InputDate from '../../../../../../../shared/inputs/InputDate';
import InputFileWithDragAndDrop from '../../../../../../../shared/inputs/InputFileWithDragAndDrop';
import InputIcon from '../../../../../../../shared/inputs/InputIcon';
import { CLIENTS } from '../../../../../constants';
import { ContractDataType } from '../constant';

interface CreateOrUpdateModalProps {
  onClose: () => void;
  contract?: ContractDataType;
  isUpdated?: boolean;
  isRenewContract?: boolean;
  title?: string;
}

const CreateOrUpdateContractModal: FC<PropsWithChildren<CreateOrUpdateModalProps>> = ({
  title,
  contract,
  isUpdated = false,
  onClose,
  isRenewContract = false,
}) => {
  const [date, setDate] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const [file, setFile] = useState<File | null | undefined>();

  return (
    <Modal onClose={onClose} title={title}>
      <form className="flex flex-col gap-y-2 px-[26px]">
        {isRenewContract && contract && (
          <span className="text-black-1 text-xl mb-8 font-medium">{contract.name}</span>
        )}
        <div className="flex gap-x-4">
          <InputDate placeholder="Début" date={date} onChange={(value) => setDate(value)} />
          <InputDate placeholder="Fin" date={date} onChange={(value) => setDate(value)} />
        </div>
        {!isRenewContract && (
          <>
            <div
              role="presentation"
              className="relative"
              onClick={() => setShowDropdown((preview) => !preview)}
            >
              <InputIcon
                icon="search"
                onChange={() => {}}
                iconColor="text-gray-10"
                additionalInputClass="placeholder:text-gray-1"
                additionalClass="rounded-md h-[56px] bg-white-2 sticky top-0 right-0 z-[500]"
                placeholder="Assignation"
              />
              <div className="absolute w-full">{showDropdown && <DropDown items={CLIENTS} />}</div>
            </div>
            <div className="w-full h-[76px] border-[1px] border-dashed border-[#bdbdbd] hover:bg-gray-3 rounded-xl">
              <InputFileWithDragAndDrop
                icon="upload-2"
                file={file}
                setFile={setFile}
                actionForFile=""
                typeFile="votre pièce jointe"
              />
            </div>
          </>
        )}
        <div className="flex gap-x-2 mt-4">
          <Button type="button" title="Annuler" className="uppercase" onClick={onClose} />
          {isUpdated ? (
            <Button type="submit" iconSize={20} title="Modifier" variant="primary" />
          ) : (
            <Button
              type="submit"
              icon={isRenewContract ? 'reload' : ''}
              iconSize={20}
              title={isRenewContract ? 'Renouveler' : 'Créer'}
              variant="primary"
            />
          )}
        </div>
      </form>
    </Modal>
  );
};

export default CreateOrUpdateContractModal;
