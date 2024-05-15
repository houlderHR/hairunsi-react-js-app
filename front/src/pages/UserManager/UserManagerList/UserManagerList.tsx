import './style.scss';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteUserById, getAllUsers, getAllUsersByDepartment } from '../../../hooks/user';
import { SearchType } from '../../../hooks/useSearch';
import { DEPARTMENT } from '../../../routes/endpoints';
import routes from '../../../routes/paths';
import HeadManager from '../../../shared/authenticated/HeadManager';
import { ModalShowStateType } from '../../../shared/authenticated/Modal';
import DropDown from '../../../shared/authenticated/Modal/DropDown';
import Icon from '../../../shared/Icon';
import Loading from '../../../shared/Loading/Loading';
import http from '../../../utils/http-common';
import ObjDetail from './obj-detail';
import UserManagerUserModal from './UserManagerListModal/UserManagerListModal';

const UserManagerList: FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState<ModalShowStateType>(ModalShowStateType.CLOSE);
  const [userToUpdate, setUserToUpdate] = useState<ObjDetail | null>(null);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [userSearch, setUserSearch] = useState<ObjDetail[] | undefined>();
  const [showType, setShowType] = useState(false);
  const [department, setDepartment] = useState<{ name: string; id: string } | undefined>();
  const [searchLoading, setSearchLoading] = useState(false);

  const getSearchLoading = (isLoadingUser: boolean) => setSearchLoading(isLoadingUser);

  const pushSearchUser = (_user: ObjDetail[] | undefined) => {
    setUserSearch(_user);
  };
  queryClient.invalidateQueries({ queryKey: ['user_department'] });
  const { isPending, error, data } = useQuery({
    queryKey: ['user'],
    queryFn: async () => (await getAllUsers()).data,
  });
  const userFilterDepartment = useQuery({
    queryKey: ['user_department'],
    queryFn: async () => (await getAllUsersByDepartment(department?.id)).data,
  });
  const departmentDataForOption = useQuery({
    queryKey: ['department_data'],
    queryFn: () => http.get(DEPARTMENT).then((res) => res.data),
  });

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
    setIsLoading(true);
    try {
      const userDeleted = await deleteUserById(userToDelete);
      if (userDeleted.status === 200) {
        queryClient.invalidateQueries({ queryKey: ['user'] });
        queryClient.invalidateQueries({ queryKey: ['user_department'] });
        setUserToDelete(null);
      }
    } catch (err) {
      const exceptions = err as AxiosError;
      if (exceptions.code === 'ERR_NETWORK') navigate(routes.server_error.path);
    }
    setIsLoading(false);
  };
  if (isPending) return 'Loading...';

  if (error) navigate(routes.server_error.path);
  return (
    <>
      <div className="flex flex-row items-center w-full h-1/4 my-1 gap-x-2">
        <div className="w-3/4">
          <HeadManager
            title="NOUVEL UTILISATEUR"
            onOpen={() => setShowModal(ModalShowStateType.CREATE)}
            pushSearch={pushSearchUser}
            searchType={SearchType.USER}
            getSearchLoading={getSearchLoading}
          />
        </div>
        <div
          className="w-1/4 relative h-[46px]"
          role="presentation"
          onClick={() => setShowType((s) => !s)}
        >
          <div className="flex flex-row justify-between  items-center w-full h-full px-5 bg-gray-3 rounded-[2px] hover:bg-gray-50;">
            <div>{!department?.name ? 'Département' : department?.name}</div>

            <Icon name="sharp-arrow-drop-down" size={10} className="text-gray-500" />
          </div>
          {showType && (
            <DropDown
              items={[...departmentDataForOption.data, { name: 'Tous', id: 'department_all' }]}
              setValue={setDepartment}
              onClickItem={() => queryClient.invalidateQueries({ queryKey: ['user_department'] })}
            />
          )}
        </div>
      </div>
      <div className="container-user relative">
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
              {searchLoading && (
                <div className="absolute w-full h-full flex items-center justify-center top-0 left-0">
                  <div className="h-96 flex justify-center">
                    <Loading />
                  </div>
                </div>
              )}
              {!searchLoading && userSearch && userSearch.length === 0 && (
                <p className="text-center text-gray-500 mt-8 font-medium absolute mx-auto w-full">
                  Aucun utilisateur trouvé
                </p>
              )}
              {data.length === 0 && !userSearch && userFilterDepartment.data.length === 0 && (
                <p className="text-center text-gray-500 mt-8 font-medium absolute mx-auto w-full">
                  Pas d&apos;utilisateur
                </p>
              )}
              {!userSearch &&
                !department &&
                !searchLoading &&
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
                ))}
              {userSearch &&
                userFilterDepartment.data &&
                !searchLoading &&
                data &&
                userSearch.map((user: ObjDetail, index: number) => (
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
                ))}
              {!userSearch &&
                userFilterDepartment.data &&
                !searchLoading &&
                userFilterDepartment.data.map((user: ObjDetail, index: number) => (
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
                ))}
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
        isDeleting={isLoading}
      />
    </>
  );
};

export default UserManagerList;
