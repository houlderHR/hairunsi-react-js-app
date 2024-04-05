import './style.scss';
import { FC } from 'react';
import { ModalShowStateType } from '../../../../shared/authenticated/Modal';
import Icon from '../../../../shared/Icon';
import ObjDetail from '../obj-detail';

interface Detail {
  detail: ObjDetail;
  className: string;
  categorie: string;
  setModal: React.Dispatch<React.SetStateAction<ModalShowStateType>>;
  setUserToUpdate?: React.Dispatch<React.SetStateAction<ObjDetail | null>>;
}

const DetailList: FC<Detail> = ({ detail, className, categorie, setModal, setUserToUpdate }) => {
  const changeUser = (user: ObjDetail) => {
    if (setUserToUpdate) {
      setModal(ModalShowStateType.UPDATE);
      setUserToUpdate(user);
    }
  };

  if (categorie === 'head')
    return (
      <div className={className}>
        <div className="text matricule">{detail.matricule.toUpperCase()}</div>
        <div className="text nom">{detail.nom.toUpperCase()}</div>
        <div className="text prenom">
          <div>{detail.prenom.toUpperCase()}</div>
          <img className="up-down" src="/icon/up-down.svg" alt="up-down" />
        </div>
        <div className="text ddn">{detail.ddn.toUpperCase()}</div>
        <div className="text type">{detail.type.toUpperCase()}</div>
        <div className="text action">{'Actions'.toUpperCase()}</div>
      </div>
    );

  return (
    <div className={className}>
      <div className="text matricule">{detail.matricule}</div>
      <div className="text nom">{detail.nom.toUpperCase()}</div>
      <div className="text prenom">{detail.prenom}</div>
      <div className="text ddn">{detail.ddn}</div>
      <div className="text type">{detail.type}</div>
      <div className="text action">
        <div className="icons">
          <div className="icon-action" role="presentation" onClick={() => changeUser(detail)}>
            <Icon name="pen" className="text-gray-500 hover:text-gray-800" size={12} />
          </div>
          <div
            role="presentation"
            className="icon-action"
            onClick={() => setModal(ModalShowStateType.DELETE)}
          >
            <Icon name="x" className="text-gray-500 hover:text-red-700" size={12} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailList;
