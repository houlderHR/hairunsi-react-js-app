import './style.scss';
import { FC } from 'react';
import ObjDetail from '../obj-detail';

interface Detail {
  detail: ObjDetail;
  classes: string;
  categorie: string;
}
const DetailList: FC<Detail> = ({ detail, classes, categorie }) => {
  if (categorie === 'head')
    return (
      <div className={classes}>
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
    <div className={classes}>
      <div className="text matricule">{detail.matricule}</div>
      <div className="text nom">{detail.nom.toUpperCase()}</div>
      <div className="text prenom">{detail.prenom}</div>
      <div className="text ddn">{detail.ddn}</div>
      <div className="text type">{detail.type}</div>
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
