import './style.scss';
import { FC, useState } from 'react';
import { SearchType } from '../../../hooks/useSearch';
import HeadManager from '../../../shared/authenticated/HeadManager';
import { ModalShowStateType } from '../../../shared/authenticated/Modal';
import DetailList from './DetailList';
import ObjDetail, { TitleDetail, UserType } from './obj-detail';
import UserManagerUserModal from './UserManagerListModal/UserManagerListModal';
import users from './users';

const title: TitleDetail = {
  matricule: 'matricule',
  firstname: 'Nom',
  lastname: 'Prénom',
  birth_date: 'Date de naissance',
  department: 'Type',
};

const UserManagerList: FC = () => {
  const [showModal, setShowModal] = useState<ModalShowStateType>(ModalShowStateType.CLOSE);
  const [userToUpdate, setUserToUpdate] = useState<ObjDetail | null>(null);
  const [userSearch, setUserSearch] = useState<UserType[] | undefined>();

  const pushSearchUser = (_user: UserType[] | undefined) => {
    setUserSearch(_user);
  };
  return (
    <>
      <div className="w-full h-1/4 my-1">
        <HeadManager
          title="NOUVEL UTILISATEUR"
          onOpen={() => setShowModal(ModalShowStateType.CREATE)}
          pushSearch={pushSearchUser}
          searchType={SearchType.USER}
        />
      </div>
      <div className="container-user">
        <div className="container-list">
          <div className="label-list">
            <DetailList
              title={title}
              className="container-headdetail"
              categorie="head"
              setModal={setShowModal}
            />
            {!users && !userSearch ? (
              <>Pas d&apos;utilisateur</>
            ) : (
              userSearch?.length === 0 &&
              users?.map((user, index) => (
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
            {userSearch?.length &&
              userSearch?.map((user, index) => (
                <DetailList
                  detail={user}
                  className={index % 2 === 0 ? 'pair' : 'impair'}
                  categorie="detail"
                  key={user.matricule}
                  setModal={setShowModal}
                  setUserToUpdate={setUserToUpdate}
                />
              ))}
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
