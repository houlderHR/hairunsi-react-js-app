import { FC, useEffect, useState } from 'react';
import RoleDto from '../../../dto/role.dto';
import { useGetRoleQuery } from '../../../hooks/useRole';
import { SearchType } from '../../../hooks/useSearch';
import CardRole from '../../../shared/authenticated/CardUserManager/CardRole';
import HeadManager from '../../../shared/authenticated/HeadManager';
import { ModalShowStateType } from '../../../shared/authenticated/Modal';
import UserManagerRoleModal from './UserManagerRoleModal';

const UserManagerRole: FC = () => {
  const [showModal, setShowModal] = useState<ModalShowStateType>(ModalShowStateType.CLOSE);
  const [allRole, setAllRole] = useState<RoleDto[] | undefined>();
  const [role, setRole] = useState<RoleDto | undefined>();
  const { data, error, isLoading } = useGetRoleQuery();
  const pushRoleType = (_role: RoleDto[] | undefined) => {
    setAllRole(_role);
  };

  const openUpdateModal = (roleData: RoleDto) => () => {
    setShowModal(ModalShowStateType.UPDATE);
    setRole(roleData);
  };
  const openDeleteModal = (roleData: RoleDto) => () => {
    setShowModal(ModalShowStateType.DELETE);
    setRole(roleData);
  };

  useEffect(() => {
    if (data) {
      setAllRole(data);
    }
  }, [data]);

  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>Loading...</div>;

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
          allRole.map((item: RoleDto, index: number) => (
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
