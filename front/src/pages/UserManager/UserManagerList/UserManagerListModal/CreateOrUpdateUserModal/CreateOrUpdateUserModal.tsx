import './index.scss';
import { FC, useState } from 'react';
import CreateModal from '../../../../../shared/authenticated/Modal/CreateModal';
import DropDown from '../../../../../shared/authenticated/Modal/DropDown';
import UpdateModal from '../../../../../shared/authenticated/Modal/UpdateModal';
import Icon from '../../../../../shared/Icon';
import Input from '../../../../../shared/inputs/Input';
import InputFileWithDragAndDrop from '../../../../../shared/inputs/InputFileWithDragAndDrop';
import InputIcon from '../../../../../shared/inputs/InputIcon';
import ObjDetail from '../../obj-detail';
import { POSTES, TYPES } from '../constants';

interface CreateModalUserProps {
  user: ObjDetail | null;
  onClose: () => void;
}

const CreateOrUpdateUserModal: FC<CreateModalUserProps> = ({ user, onClose }) => {
  const [showPoste, setShowPoste] = useState(false);
  const [showType, setShowType] = useState(false);
  const [file, setFile] = useState<File | null | undefined>();
  if (user)
    return (
      <UpdateModal onClose={onClose} title="Modification utilisateur">
        <div className="flex gap-4 flex-col w-full">
          <div className="container-create-modal">
            <div className="content">
              <div className="file-with-names">
                <div className="file">
                  <InputFileWithDragAndDrop file={file} setFile={setFile} />
                </div>
                <div className="names">
                  <Input
                    value={user.matricule}
                    type="text"
                    placeholder="Matricule"
                    additionalClass="h-[8vh]"
                  />
                  <Input value={user.nom} type="text" placeholder="Nom" additionalClass="h-[8vh]" />
                  <Input
                    value={user.prenom}
                    type="text"
                    placeholder="Prénom"
                    additionalClass="h-[8vh]"
                  />
                </div>
              </div>
              <div className="relative">
                <div className="input-date">
                  <input
                    type="text"
                    id="date"
                    placeholder={user.ddn}
                    className="input"
                    onFocus={(e) => {
                      e.target.type = 'date';
                    }}
                    onBlur={(e) => {
                      if (!e.target.value) e.target.type = 'text';
                    }}
                  />
                  <img src="/icon/date.svg" alt="date" />
                </div>
                <div className="poste-type">
                  <div
                    className="poste"
                    role="presentation"
                    onClick={() => setShowPoste((s) => !s)}
                  >
                    <InputIcon
                      placeholder="Poste"
                      additionalClass="py-1 hover:bg-gray-50"
                      additionalInputClass="text-base"
                      icon="search"
                    />

                    {showPoste && <DropDown items={POSTES} />}
                  </div>
                  <div className="type" role="presentation" onClick={() => setShowType((s) => !s)}>
                    <div className="libelle">
                      <div>{user.type}</div>
                      <Icon name="sharp-arrow-drop-down" size={10} className="text-gray-500" />
                    </div>
                    {showType && <DropDown items={TYPES} />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UpdateModal>
    );

  return (
    <CreateModal onClose={onClose} title="Nouvel utilisateur">
      <div className="flex gap-4 flex-col w-full">
        <div className="container-create-modal">
          <div className="content">
            <div className="file-with-names">
              <div className="file">
                <InputFileWithDragAndDrop file={file} setFile={setFile} />
              </div>
              <div className="names">
                <Input type="text" placeholder="Matricule" additionalClass="h-[8vh]" />
                <Input type="text" placeholder="Nom" additionalClass="h-[8vh]" />
                <Input type="text" placeholder="Prénom" additionalClass="h-[8vh]" />
              </div>
            </div>
            <div className="relative">
              <div className="input-date">
                <input
                  type="text"
                  id="date"
                  placeholder="Date de naissance"
                  className="input"
                  onFocus={(e) => {
                    e.target.type = 'date';
                  }}
                  onBlur={(e) => {
                    if (!e.target.value) e.target.type = 'text';
                  }}
                />
                <img src="/icon/date.svg" alt="date" />
              </div>
              <div className="poste-type">
                <div className="poste" role="presentation" onClick={() => setShowPoste((s) => !s)}>
                  <InputIcon
                    placeholder="Poste"
                    additionalClass="py-1 hover:bg-gray-50"
                    additionalInputClass="text-base"
                    icon="search"
                  />
                  {showPoste && <DropDown items={POSTES} />}
                </div>
                <div className="type" role="presentation" onClick={() => setShowType((s) => !s)}>
                  <div className="libelle">
                    {' '}
                    <div>Type</div>
                    <Icon name="sharp-arrow-drop-down" size={10} className="text-gray-500" />
                  </div>
                  {showType && <DropDown items={TYPES} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CreateModal>
  );
};

export default CreateOrUpdateUserModal;
