import './style.scss';
import { FC } from 'react';
import ObjDetail from '../obj-detail';

const DetailList: FC<ObjDetail> = ({ matricule, nom, prenom, ddn, type, classes, categorie }) => {
  if (categorie === 'head')
    return (
      <div className={classes}>
        <div className="text matricule">{matricule.toUpperCase()}</div>
        <div className="text nom">{nom.toUpperCase()}</div>
        <div className="text prenom">
          <div>{prenom.toUpperCase()}</div>
          <img className="up-down" src="/icon/up-down.svg" alt="up-down" />
        </div>
        <div className="text ddn">{ddn.toUpperCase()}</div>
        <div className="text type">{type.toUpperCase()}</div>
        <div className="text action">{'Actions'.toUpperCase()}</div>
      </div>
    );
  return (
    <div className={classes}>
      <div className="text matricule">{matricule}</div>
      <div className="text nom">{nom.toUpperCase()}</div>
      <div className="text prenom">{prenom}</div>
      <div className="text ddn">{ddn}</div>
      <div className="text type">{type}</div>
      <div className="text action">
        <div className="icons">
          <div className="icon-action">
            <img src="/icon/pen-grey.svg" alt="pen" className="pen" />
          </div>
          <div className="icon-action">
            <img src="/icon/x-grey.svg" alt="delete" className="delete" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailList;
