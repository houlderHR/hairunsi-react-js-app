import './style.scss';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { FC, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ObjDetail from '../../../dto/user.dto';
import { deleteUserById, getAllUsers, getAllUsersByDepartment } from '../../../hooks/user';
import { SearchType } from '../../../hooks/useSearch';
import useUserPermission from '../../../hooks/useUserPermission';
import { DEPARTMENT } from '../../../routes/endpoints';
import routes from '../../../routes/paths';
import AllowedRoute from '../../../shared/authenticated/AllowedRoute';
import HeadManager from '../../../shared/authenticated/HeadManager';
import { ModalShowStateType } from '../../../shared/authenticated/Modal';
import DropDown from '../../../shared/authenticated/Modal/DropDown';
import UserContext from '../../../shared/authenticated/userContext';
import Icon from '../../../shared/Icon';
import Loading from '../../../shared/Loading/Loading';
import http from '../../../utils/http-common';
import PERMISSIONS from '../../../utils/permissions';
import {
  QUERY_USER_DEPARTMENT_FILTER_KEY,
  QUERY_USER_DEPARTMENT_KEY,
  QUERY_USER_KEY,
} from '../../../utils/query.constants';
import UserManagerUserModal from './UserManagerListModal/UserManagerListModal';

const numberLines = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const UserManagerList: FC = () => {
  const navigate = useNavigate();

  const userContext = useContext(UserContext);

  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState<ModalShowStateType>(ModalShowStateType.CLOSE);
  const [userToUpdate, setUserToUpdate] = useState<ObjDetail | null>(null);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [userSearch, setUserSearch] = useState<ObjDetail[] | undefined>();
  const [showType, setShowType] = useState(false);
  const [department, setDepartment] = useState<{ name: string; id: string } | undefined>();
  const [searchLoading, setSearchLoading] = useState(false);

  const { allowPermission } = useUserPermission();

  const pushSearchUser = (_user: ObjDetail[] | undefined) => {
    setUserSearch(_user);
  };
  queryClient.invalidateQueries({ queryKey: [QUERY_USER_DEPARTMENT_KEY] });
  const { isPending, error, data } = useQuery({
    queryKey: [QUERY_USER_KEY],
    queryFn: async () => (await getAllUsers()).data,
  });
  const userFilterDepartment = useQuery({
    queryKey: [QUERY_USER_DEPARTMENT_KEY],
    queryFn: async () => (await getAllUsersByDepartment(department?.id)).data,
  });
  const departmentDataForOption = useQuery({
    queryKey: [QUERY_USER_DEPARTMENT_FILTER_KEY],
    queryFn: () => http.get(DEPARTMENT.departmentWithAnonymous).then((res) => res.data),
  });

  // For pagination
  const [showLines, setShowLines] = useState(false);
  const [numberUsers, setnumberUsers] = useState<number>(5);
  const [currentPage, setCurrentpage] = useState(1);
  const lastIndex = numberUsers * currentPage;
  const firstIndex = lastIndex - numberUsers;
  let users = [];
  if (userSearch) {
    users = userSearch;
  } else if (userFilterDepartment.data && department) users = userFilterDepartment.data;
  else if (data) users = data;
  const record = users.slice(firstIndex, lastIndex);
  const npage = Math.ceil(users ? users.length / numberUsers : 0);

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentpage(currentPage + 1);
    }
  }

  function previousPage() {
    if (currentPage !== 1) {
      setCurrentpage(currentPage - 1);
    }
  }

  const getSearchLoading = (isLoadingUser: boolean) => setSearchLoading(isLoadingUser);

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
        queryClient.invalidateQueries({ queryKey: [QUERY_USER_KEY] });
        queryClient.invalidateQueries({ queryKey: [QUERY_USER_DEPARTMENT_KEY] });
        setUserToDelete(null);
      }
    } catch (err) {
      const exceptions = err as AxiosError;
      if (exceptions.code === 'ERR_NETWORK') navigate(routes.server_error.path);
    }
    setIsLoading(false);
    setShowModal(ModalShowStateType.CLOSE);
  };

  const allowUserToUpdate = (id: string) =>
    (allowPermission(PERMISSIONS.updateUser) && id === userContext?.uuid) ||
    allowPermission(PERMISSIONS.updateAll);

  if (isPending) return 'Loading...';

  if (error) navigate(routes.server_error.path);
  return (
    <AllowedRoute isAllowed>
      <div className="flex flex-row items-center w-full h-1/4 my-1 gap-x-2 sticky top-32 z-50">
        <div className="w-10/12 xl:w-3/4">
          <HeadManager
            title="NOUVEL UTILISATEUR"
            onOpen={() => setShowModal(ModalShowStateType.CREATE)}
            pushSearch={pushSearchUser}
            searchType={SearchType.USER}
            getSearchLoading={getSearchLoading}
            allowCreation={allowPermission(PERMISSIONS.createAll)}
          />
        </div>
        <div
          className="w-2/12 xl:w-1/4 relative h-[46px]"
          role="presentation"
          onClick={() => setShowType((s) => !s)}
        >
          <div className="flex flex-row justify-center xl:flex xl:flex-row xl:items-center xl:justify-between items-center w-full h-full px-5 bg-gray-3 rounded-[2px] hover:bg-gray-50;">
            <div className="hidden xl:flex">{!department?.name ? 'Type' : department?.name}</div>

            <Icon name="sharp-arrow-drop-down" size={10} className="text-gray-500 hidden xl:flex" />
            <img src="/icon/filter.svg" alt="filter" className="xl:hidden" />
          </div>
          <div className="w-[200px] absolute right-0 xl:w-full xl:flex">
            {showType && (
              <DropDown
                items={[...departmentDataForOption.data, { name: 'Tous', id: 'department_all' }]}
                setValue={setDepartment}
                onClickItem={() => queryClient.invalidateQueries({ queryKey: ['user_department'] })}
              />
            )}
          </div>
        </div>
      </div>
      <div className="container-user relative">
        <div className="container-list">
          <div className="w-full flex flex-col">
            <div className="container-headdetail">
              <div className="text matricule sticky top-0">Matricule</div>
              <div className="text nom sticky top-0">NOM</div>
              <div className="text prenom sticky top-0">
                <div>PRENOM(S)</div>
                <img className="up-down" src="/icon/up-down.svg" alt="up-down" />
              </div>
              <div className="text ddn sticky top-0">DATE DE NAISSANCE</div>
              <div className="text type sticky top-0">TYPE</div>
              <div className="text action sticky top-0">ACTION</div>
            </div>
            <div className="max-h-[616px] overflow-y-scroll scroll-smooth">
              {searchLoading && (
                <div className="absolute w-full h-full flex items-center justify-center top-0 left-0">
                  <div className="h-96 flex justify-center">
                    <Loading />
                  </div>
                </div>
              )}
              {(userSearch?.length === 0 ||
                (userFilterDepartment.data.length === 0 && department && !userSearch)) && (
                <p className="text-center text-gray-500 mt-8 font-medium absolute mx-auto w-full">
                  Aucun utilisateur trouvé
                </p>
              )}
              {userSearch?.length === 0 &&
                data?.length === 0 &&
                userFilterDepartment.data.length === 0 && (
                  <p className="text-center text-gray-500 mt-8 font-medium absolute mx-auto w-full">
                    Pas d&apos;utilisateur
                  </p>
                )}
              {record.map((user: ObjDetail, index: number) => (
                <div className={index % 2 === 0 ? 'pair' : 'impair'} key={user.matricule}>
                  <div className="text matricule">{user.matricule}</div>
                  <div className="text nom">{user.firstname.toUpperCase()}</div>
                  <div className="text prenom">{user.lastname}</div>
                  <div className="text ddn">{new Date(user.birth_date).toLocaleDateString()}</div>
                  <div className="text type">{user.post.department.name}</div>
                  <div className="text action">
                    <div className="icons">
                      {allowUserToUpdate(user.uuid) && (
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
                      )}
                      {allowPermission(PERMISSIONS.removeAll) && (
                        <div
                          role="presentation"
                          className="icon-action"
                          onClick={() => settingUserToDelete(user.uuid)}
                        >
                          <Icon name="x" className="text-gray-500 hover:text-red-700" size={12} />
                        </div>
                      )}
                    </div>{' '}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="container-pagination">
          <div className="content-pagination">
            <div className="line">
              <div>Lignes par page</div>
              <div className="flex flex-col justify-end relative ">
                {showLines && (
                  <ul className="bottom-0 mt-[24px] w-15 border-1 border-gray-400 bg-white z-50">
                    {numberLines.map((n) => (
                      <li
                        key={n}
                        className="flex flex-col items-center h-10 cursor-pointer py-2 hover:bg-gray-100 rounded-md "
                        role="presentation"
                        onClick={() => {
                          setnumberUsers(n);
                          setCurrentpage(1);
                          setShowLines((s) => !s);
                        }}
                      >
                        {n}
                      </li>
                    ))}
                  </ul>
                )}
                <div
                  className="line-number"
                  role="presentation"
                  onClick={() => setShowLines((s) => !s)}
                >
                  <div>{numberUsers || '-'}</div>
                  <div className="flex flex-col justify-center items-center">
                    <img src="/icon/sharp-arrow-drop-down-grey.svg" alt="arrow" />
                  </div>
                </div>
              </div>
            </div>
            <div className="page">
              <div
                className="flex flex-col justify-center items-center rotate-90"
                role="presentation"
                onClick={previousPage}
              >
                <img src="/icon/sharp-arrow-drop-down-grey.svg" alt="arrow" className="w-[18px]" />
              </div>
              <div
                className="flex flex-col justify-center items-center -rotate-90"
                role="presentation"
                onClick={nextPage}
              >
                <img src="/icon/sharp-arrow-drop-down-grey.svg" alt="arrow" className="w-[18px]" />
              </div>
            </div>
            {/* <div className="page">1-10 de {userSearch?.length || data.length}</div> */}
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
    </AllowedRoute>
  );
};

export default UserManagerList;
