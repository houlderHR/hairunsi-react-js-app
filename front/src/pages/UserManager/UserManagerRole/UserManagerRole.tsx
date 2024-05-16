import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoleResponseDto } from '../../../dto/role.dto';
import { useGetRoleQuery } from '../../../hooks/useRole';
import { SearchType } from '../../../hooks/useSearch';
import routes from '../../../routes/paths';
import CardRole from '../../../shared/authenticated/CardUserManager/CardRole';
import HeadManager from '../../../shared/authenticated/HeadManager';
import { ModalShowStateType } from '../../../shared/authenticated/Modal';
import Loading from '../../../shared/Loading/Loading';
import UserManagerRoleModal from './UserManagerRoleModal';

const UserManagerRole: FC = () => {
  const [showModal, setShowModal] = useState<ModalShowStateType>(ModalShowStateType.CLOSE);
  const [allRole, setAllRole] = useState<RoleResponseDto[]>();
  const [role, setRole] = useState<RoleResponseDto>();
  const { data, error, isLoading } = useGetRoleQuery();
  const [searchLoading, setSearchLoading] = useState(false);

  const navigate = useNavigate();
  const pushRoleType = (_role?: RoleResponseDto[]) => {
    setAllRole(_role);
  };

  const getSearchLoading = (isLoadingRole: boolean) => setSearchLoading(isLoadingRole);

  const openUpdateModal = (roleData: RoleResponseDto) => () => {
    setShowModal(ModalShowStateType.UPDATE);
    setRole(roleData);
  };
  const openDeleteModal = (roleData: RoleResponseDto) => () => {
    setShowModal(ModalShowStateType.DELETE);
    setRole(roleData);
  };

  useEffect(() => {
    if (data) {
      setAllRole(data);
    }
  }, [data]);

  if (error) navigate(routes.server_error.path);
  if (isLoading)
    return (
      <div className="h-96 flex justify-center">
        <Loading />
      </div>
    );
  return (
    <>
      <HeadManager
        title="CREER UN NOUVEAU ROLE"
        onOpen={() => setShowModal(ModalShowStateType.CREATE)}
        searchType={SearchType.ROLE}
        pushSearch={pushRoleType}
        getSearchLoading={getSearchLoading}
      />

      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-2 w-full mt-8">
        {searchLoading && (
          <div className="absolute w-full mt-[20rem] h-full flex items-center justify-center top-0 left-0">
            <div className="h-96 flex justify-center">
              <Loading />
            </div>
          </div>
        )}
        {!searchLoading && allRole && allRole.length === 0 && (
          <p className="text-center text-gray-500 font-medium absolute mx-auto w-full">
            Aucun rôle trouvé
          </p>
        )}
        {!searchLoading &&
          allRole &&
          allRole.map((item: RoleResponseDto) => (
            <CardRole
              key={item.id}
              isRemovable={!item.isSeed && item.departments.length === 0}
              openUpdateModal={openUpdateModal(item)}
              openDeleteModal={openDeleteModal(item)}
              title={item.name}
              maxElement={10}
              items={item.permissions}
            />
          ))}
        {!searchLoading &&
          !allRole &&
          data.map((item: RoleResponseDto) => (
            <CardRole
              key={item.id}
              isRemovable={!item.isSeed && item.departments.length === 0}
              openUpdateModal={openUpdateModal(item)}
              openDeleteModal={openDeleteModal(item)}
              title={item.name}
              maxElement={10}
              items={item.permissions}
            />
          ))}
      </div>
      <UserManagerRoleModal role={role} modalState={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default UserManagerRole;
