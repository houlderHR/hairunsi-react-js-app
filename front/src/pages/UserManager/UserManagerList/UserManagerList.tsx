import './style.scss';
import { FC, useState } from 'react';
import HeadManager from '../../../shared/authenticated/HeadManager';
import { ModalShowStateType } from '../../../shared/authenticated/Modal';
import DetailList from './DetailList';
import ObjDetail from './obj-detail';
import UserManagerUserModal from './UserManagerListModal/UserManagerListModal';
import users from './users';

const title: ObjDetail = {
  matricule: 'matricule',
  nom: 'Nom',
  prenom: 'Prénom',
  ddn: 'Date de naissance',
  type: 'Type',
};

const UserManagerList: FC = () => {
  const [showModal, setShowModal] = useState<ModalShowStateType>(ModalShowStateType.CLOSE);
  const [userToUpdate, setUserToUpdate] = useState<ObjDetail | null>(null);

  return (
    <>
      <div className="w-full h-1/4 my-1">
        <HeadManager
          title="NOUVEL UTILISATEUR"
          onOpen={() => setShowModal(ModalShowStateType.CREATE)}
        />
      </div>
      <div className="container-user">
        <div className="container-list">
          <div className="label-list">
            <DetailList
              detail={title}
              className="container-headdetail"
              categorie="head"
              setModal={setShowModal}
            />
            {!users ? (
              <>Pas d&apos;utilisateur</>
            ) : (
              users.map((user, index) => (
                <DetailList
                  detail={user}
                  className={index % 2 === 0 ? 'pair' : 'impair'}
                  categorie="detail"
                  key={user.matricule}
                  setModal={setShowModal}
                  setUserToUpdate={setUserToUpdate}
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
      <UserManagerUserModal
        user={userToUpdate}
        setUser={setUserToUpdate}
        modalState={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
};

export default UserManagerList;
