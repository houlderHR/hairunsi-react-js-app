import { FC, PropsWithChildren, useState } from 'react';
import Button from '../../../../../../../shared/authenticated/buttons/Button';
import TextArea from '../../../../../../../shared/authenticated/input/TextArea';
import Modal from '../../../../../../../shared/authenticated/Modal';
import DropDown from '../../../../../../../shared/authenticated/Modal/DropDown';
import InputIcon from '../../../../../../../shared/inputs/InputIcon';
import { CLIENTS } from '../../../../../constants';
import { ContractDataType } from '../constant';

interface TerminateContractModalProps {
  onClose: () => void;
  contract?: ContractDataType;
  title?: string;
}

const TerminateContractModal: FC<PropsWithChildren<TerminateContractModalProps>> = ({
  title,
  contract,
  onClose,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <Modal onClose={onClose} title={title}>
      <form className="flex flex-col gap-y-4 px-[26px]">
        <TextArea placeholder="Motif" classNames="!h-[112px]" />
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
            placeholder="Résilier à"
          />
          <div className="absolute w-full">{showDropdown && <DropDown items={CLIENTS} />}</div>
        </div>
        <div className="flex gap-x-2 mt-4">
          <Button type="button" title="Annuler" className="uppercase" onClick={onClose} />
          <Button type="button" iconSize={20} title="Résilier" variant="primary" />
        </div>
      </form>
    </Modal>
  );
};

export default TerminateContractModal;
