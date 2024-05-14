import './style.scss';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteUserById, getAllUsers } from '../../../hooks/user';
import { SearchType } from '../../../hooks/useSearch';
import routes from '../../../routes/paths';
import HeadManager from '../../../shared/authenticated/HeadManager';
import { ModalShowStateType } from '../../../shared/authenticated/Modal';
import Icon from '../../../shared/Icon';
import ObjDetail, { UserType } from './obj-detail';
import UserManagerUserModal from './UserManagerListModal/UserManagerListModal';

const UserManagerList: FC = () => {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState<ModalShowStateType>(ModalShowStateType.CLOSE);
  const [userToUpdate, setUserToUpdate] = useState<ObjDetail | null>(null);
  const [userSearch, setUserSearch] = useState<UserType[] | undefined>();

  const pushSearchUser = (_user: UserType[] | undefined) => {
    setUserSearch(_user);
  };
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const { isPending, error, data } = useQuery({
    queryKey: ['user'],
    queryFn: async () => (await getAllUsers()).data,
  });

  const navigate = useNavigate();

  const updateUser = (user: ObjDetail) => {
    if (setUserToUpdate) {
      setShowModal(ModalShowStateType.UPDATE);
      setUserToUpdate(user);
    }
  };

  const settingUserToDelete = (uuid: string) => {
    setUserToDelete(uuid);
    setShowModal(ModalShowStateType.DELETE);
  };

  const deleteUser = async () => {
    try {
      const userDeleted = await deleteUserById(userToDelete);
      if (userDeleted.status === 200) {
        queryClient.invalidateQueries({ queryKey: ['user'] });
        setUserToDelete(null);
      }
    } catch (err) {
      const exceptions = err as AxiosError;
      if (exceptions.code === 'ERR_NETWORK') navigate(routes.server_error.path);
    }
  };

  if (isPending) return 'Loading...';

  if (error) navigate(routes.server_error.path);
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
          <table className="w-full">
            <thead className="container-headdetail">
              <th className="text matricule">Matricule</th>
              <th className="text nom">NOM</th>
              <th className="text prenom">
                <div>PRENOM(S)</div>
                <img className="up-down" src="/icon/up-down.svg" alt="up-down" />
              </th>
              <th className="text ddn">DATE DE NAISSANCE</th>
              <th className="text type">TYPE</th>
              <th className="text action">ACTION</th>
            </thead>
            <tbody>
              {!data ? (
                <>Pas d&apos;utilisateur</>
              ) : (
                data.map((user: ObjDetail, index: number) => (
                  <tr className={index % 2 === 0 ? 'pair' : 'impair'} key={user.matricule}>
                    <td className="text matricule">{user.matricule}</td>
                    <td className="text nom">{user.firstname.toUpperCase()}</td>
                    <td className="text prenom">{user.lastname}</td>
                    <td className="text ddn">{new Date(user.birth_date).toLocaleDateString()}</td>
                    <td className="text type">{user.post.department.name}</td>
                    <td className="text action">
                      <div className="icons">
                        <div
                          className="icon-action"
                          role="presentation"
                          onClick={() => updateUser(user)}
                        >
                          <Icon
                            name="pen"
                            className="text-gray-500 hover:text-gray-800"
                            size={12}
                          />
                        </div>
                        <div
                          role="presentation"
                          className="icon-action"
                          onClick={() => settingUserToDelete(user.uuid)}
                        >
                          <Icon name="x" className="text-gray-500 hover:text-red-700" size={12} />
                        </div>
                      </div>{' '}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
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
        onDelete={deleteUser}
      />
    </>
  );
};

export default UserManagerList;
