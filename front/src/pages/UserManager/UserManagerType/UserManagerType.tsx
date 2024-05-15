import { useQuery } from '@tanstack/react-query';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DepartmentDto from '../../../dto/department.dto';
import { SearchType } from '../../../hooks/useSearch';
import routes from '../../../routes/paths';
import CardType from '../../../shared/authenticated/CardUserManager/CardType';
import HeadManager from '../../../shared/authenticated/HeadManager';
import { ModalShowStateType } from '../../../shared/authenticated/Modal';
import Spinner from '../../../shared/Spinner';
import http from '../../../utils/http-common';
import UserManagerTypeModal from './UserManagerTypeModal';

const UserManagerType: FC = () => {
  const [showModal, setShowModal] = useState<ModalShowStateType>(ModalShowStateType.CLOSE);
  const [department, setDepartment] = useState<DepartmentDto | undefined>();
  const [type, setType] = useState<DepartmentDto[] | undefined>();
  const [searchLoading, setSearchLoading] = useState(false);
  const navigate = useNavigate();

  const getSearchLoading = (isLoading: boolean) => setSearchLoading(isLoading);

  const { data: departments, isFetching: isDepartmentLoading } = useQuery({
    queryKey: ['department'],
    queryFn: () =>
      http
        .get<DepartmentDto[]>('department', { params: { role: true, posts: true } })
        .then((response) => response.data)
        .catch(() => navigate(routes.server_error.path)),
  });

  const pushSearchType = (_department: DepartmentDto[] | undefined) => {
    setType(_department);
  };

  const openUpdateModal = (_department: DepartmentDto) => () => {
    setDepartment(_department);
    setShowModal(ModalShowStateType.UPDATE);
  };
  const openDeleteModal = (_department: DepartmentDto) => () => {
    setDepartment(_department);
    setShowModal(ModalShowStateType.DELETE);
  };

  return (
    <>
      <HeadManager
        title="CREER UN NOUVEAU TYPE"
        onOpen={() => setShowModal(ModalShowStateType.CREATE)}
        pushSearch={pushSearchType}
        searchType={SearchType.TYPE}
        getSearchLoading={getSearchLoading}
      />
      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-2 w-full mt-8">
        {(isDepartmentLoading || searchLoading) && (
          <div className="absolute w-full mt-[20rem] h-full flex items-center justify-center top-0 left-0">
            <Spinner additionalClassName="w-8 h-8" />
          </div>
        )}
        {!type &&
          !searchLoading &&
          !isDepartmentLoading &&
          departments?.map((_department: DepartmentDto) => (
            <CardType
              openUpdateModal={openUpdateModal(_department)}
              openDeleteModal={openDeleteModal(_department)}
              department={_department}
              key={_department.id}
            />
          ))}
        {!searchLoading && type && type.length === 0 && (
          <p className="text-center text-gray-500 font-medium absolute mx-auto w-full">
            Aucun type trouvé
          </p>
        )}
        {!searchLoading &&
          type &&
          type.length > 0 &&
          type?.map((_type: DepartmentDto) => (
            <CardType
              openUpdateModal={openUpdateModal(_type)}
              openDeleteModal={openDeleteModal(_type)}
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
