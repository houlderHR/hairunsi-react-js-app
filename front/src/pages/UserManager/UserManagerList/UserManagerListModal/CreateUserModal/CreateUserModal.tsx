import './style.scss';
import { FC, useState } from 'react';
import DragAndDrop from '../../../../../shared/authenticated/DragAndDrop';
import Input from '../../../../../shared/authenticated/Input';
import InputIcon from '../../../../../shared/authenticated/Input/InputIcon';
import { ModalShowStateType } from '../../../../../shared/authenticated/Modal';
import CreateModal from '../../../../../shared/authenticated/Modal/CreateModal';
import DropDown from '../../../../../shared/authenticated/Modal/DropDown';
import { postes, types } from '../constants';

interface CreateModalUserProps {
  setShowModal: React.Dispatch<React.SetStateAction<ModalShowStateType>>;
}

const CreateUserModal: FC<CreateModalUserProps> = ({ setShowModal }) => {
  const [showPoste, setShowPoste] = useState(false);
  const [showType, setShowType] = useState(false);
  const [file, setFile] = useState<File | null>();

  return (
    <CreateModal setShowModal={setShowModal} title="Nouveau utilisateur">
      <div className="flex gap-4 flex-col w-full">
        <div className="container-create-modal">
          <div className="content">
            <div className="file-with-names">
              <div className="file">
                <DragAndDrop file={file} setFile={setFile} />
              </div>
              <div className="names">
                <Input type="text" placeholder="Matricule" additionalClass="h-[8vh]" />
                <Input type="text" placeholder="Nom" additionalClass="h-[8vh]" />
                <Input type="text" placeholder="Prénom" additionalClass="h-[8vh]" />
              </div>
            </div>
            <div className="relative">
              <input
                type="text"
                id="date"
                placeholder="Date de naissance"
                className="input-date"
                onFocus={(e) => {
                  e.target.type = 'date';
                }}
                onBlur={(e) => {
                  if (!e.target.value) e.target.type = 'text';
                }}
              />
              <div className="poste-type">
                <div className="poste" role="presentation" onClick={() => setShowPoste((s) => !s)}>
                  <InputIcon
                    placeholder="Poste"
                    additionalClass="py-1 hover:bg-gray-50"
                    additionalInputClass="text-base"
                    icon="search"
                  />

                  {showPoste && <DropDown items={postes} setValue={() => {}} />}
                </div>
                <div className="type" role="presentation" onClick={() => setShowType((s) => !s)}>
                  <div className="libelle">Type</div>
                  {showType && <DropDown items={types} setValue={() => {}} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CreateModal>
  );
};

export default CreateUserModal;
