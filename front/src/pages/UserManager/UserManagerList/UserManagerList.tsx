import './style.scss';
import { FC } from 'react';
import DetailList from './DetailList';
import users from './users';

const UserManagerList: FC = () => (
  <>
    <div className="w-full h-1/4 my-1">
      <div className="w-2/3" />
    </div>
    <div className="container-user">
      <div className="container-list">
        <div className="label-list">
          <DetailList
            matricule="matricule"
            nom="Nom"
            prenom="Prénom"
            ddn="Date de naissance"
            type="Type"
            classes="container-headdetail"
            categorie="head"
            index={0}
          />
          {!users ? (
            <>Pas d`&apos:`utilisateur</>
          ) : (
            users.map((user, key) => (
              <DetailList
                matricule={user.matricule}
                nom={user.nom}
                prenom={user.prenom}
                ddn={user.ddn}
                type={user.type}
                classes={key % 2 === 0 ? 'pair' : 'impair'}
                categorie="detail"
                index={key}
              />
            ))
          )}
        </div>
      </div>
      <div className="container-pagination">
        <div className="content-pagination">
          <div className="line">
            <div>Lignes par page</div>
            <div className="line-number">
              <div>12</div>
              <div className="flex flex-col justify-center items-center">
                <img src="/icon/sharp-arrow-drop-down-grey.svg" alt="arrow" />
              </div>
            </div>
          </div>
          <div className="page">1-10 de 15</div>
        </div>
      </div>
    </div>
  </>
);

export default UserManagerList;
