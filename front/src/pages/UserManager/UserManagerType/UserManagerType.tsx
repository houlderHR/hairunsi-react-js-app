import { useQuery } from '@tanstack/react-query';
import { FC, useState } from 'react';
import { SearchType } from '../../../hooks/useSearch';
import CardType from '../../../shared/authenticated/CardUserManager/CardType';
import HeadManager from '../../../shared/authenticated/HeadManager';
import { ModalShowStateType } from '../../../shared/authenticated/Modal';
import http from '../../../utils/http-common';
import { DepartmentType } from './type';
import UserManagerTypeModal from './UserManagerTypeModal';

const UserManagerType: FC = () => {
  const [showModal, setShowModal] = useState<ModalShowStateType>(ModalShowStateType.CLOSE);
  const [department, setUser] = useState<DepartmentType | undefined>();
  const [type, setType] = useState<DepartmentType[] | undefined>();

  const { data: departments } = useQuery({
    queryKey: ['department'],
    queryFn: () =>
      http
        .get<DepartmentType[]>('department', { params: { role: true } })
        .then((response) => response.data),
  });

  const pushSearchType = (_type: DepartmentType[] | undefined) => {
    setType(_type);
  };

  const openUpdateModal = (_user: DepartmentType) => () => {
    setUser(_user);
    setShowModal(ModalShowStateType.UPDATE);
  };
  const openDeleteModal = () => {
    setShowModal(ModalShowStateType.DELETE);
  };
  return (
    <>
      <HeadManager
        title="CREER UN NOUVEAU TYPE"
        onOpen={() => setShowModal(ModalShowStateType.CREATE)}
        pushSearch={pushSearchType}
        searchType={SearchType.TYPE}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-2 w-full mt-8">
        {!type &&
          departments?.map((_department: DepartmentType) => (
            <CardType
              openUpdateModal={openUpdateModal(_department)}
              openDeleteModal={openDeleteModal}
              department={_department}
              key={_department.id}
            />
          ))}
        {type?.map((_type: DepartmentType) => (
          <CardType
            openUpdateModal={openUpdateModal(_type)}
            openDeleteModal={openDeleteModal}
            department={_type}
            key={_type.id}
          />
        ))}
      </div>
      <UserManagerTypeModal
        department={department}
        modalState={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
};

export default UserManagerType;
