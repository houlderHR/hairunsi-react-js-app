import { useEffect, useState } from 'react';
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

const UserManagerRole = () => {
  const [showModal, setShowModal] = useState<ModalShowStateType>(ModalShowStateType.CLOSE);
  const [allRole, setAllRole] = useState<RoleResponseDto[]>();
  const [role, setRole] = useState<RoleResponseDto>();
  const { data, error, isLoading } = useGetRoleQuery();
  const navigate = useNavigate();
  const pushRoleType = (_role?: RoleResponseDto[]) => {
    setAllRole(_role);
  };

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

  if (error) return navigate(routes.server_error.path);
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
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-2 w-full mt-8">
        {allRole &&
          allRole.map((item: RoleResponseDto, index: number) => (
            <CardRole
              key={item.id}
              openUpdateModal={openUpdateModal(item)}
              openDeleteModal={openDeleteModal(item)}
              title={item.name}
              maxElement={11}
              iconVisible={index === 0}
              items={item.permissions}
            />
          ))}
        {!allRole &&
          data.map((item: RoleResponseDto, index: number) => (
            <CardRole
              key={item.id}
              openUpdateModal={openUpdateModal(item)}
              openDeleteModal={openDeleteModal(item)}
              title={item.name}
              maxElement={11}
              iconVisible={index === 0}
              items={item.permissions}
            />
          ))}
      </div>
      <UserManagerRoleModal role={role} modalState={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default UserManagerRole;
