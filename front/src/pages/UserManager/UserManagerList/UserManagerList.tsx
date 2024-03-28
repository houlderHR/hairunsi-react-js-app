import './style.scss';
import { FC } from 'react';
import DetailList from './DetailList';
import Pagination from './Pagination';
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
        <Pagination />
      </div>
    </div>
  </>
);

export default UserManagerList;
