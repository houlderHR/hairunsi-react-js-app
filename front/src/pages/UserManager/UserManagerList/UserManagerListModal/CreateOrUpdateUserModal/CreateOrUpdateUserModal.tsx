import './index.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { FC, useContext, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import * as yup from 'yup';
import UserDto from '../../../../../dto/user.dto';
import updateUser, { createUser } from '../../../../../hooks/user';
import { SearchType } from '../../../../../hooks/useSearch';
import useUserPermission from '../../../../../hooks/useUserPermission';
import { DEPARTMENT, POST } from '../../../../../routes/endpoints';
import routes from '../../../../../routes/paths';
import Button from '../../../../../shared/authenticated/buttons/Button';
import CreateModal from '../../../../../shared/authenticated/Modal/CreateModal';
import DropDown from '../../../../../shared/authenticated/Modal/DropDown';
import UserContext from '../../../../../shared/authenticated/userContext';
import Icon from '../../../../../shared/Icon';
import Input from '../../../../../shared/inputs/Input';
import InputFileWithDragAndDrop from '../../../../../shared/inputs/InputFileWithDragAndDrop';
import Spinner from '../../../../../shared/Spinner';
import http from '../../../../../utils/http-common';
import manageErrorMessage from '../../../../../utils/manageError';
import PERMISSIONS from '../../../../../utils/permissions';
import {
  QUERY_USER_DEPARTMENT_FILTER_KEY,
  QUERY_USER_DEPARTMENT_KEY,
  QUERY_USER_KEY,
} from '../../../../../utils/query.constants';
import { REGEX_EMAIL } from '../../../../../utils/regex';

const PASSWORD_DEFAULT = 'HairunTest@123.';
interface CreateModalUserProps {
  user: UserDto | null;
  onClose: () => void;
}

const form = yup
  .object()
  .shape({
    email: yup.string().default('test@hairun-technology.com').max(255).matches(REGEX_EMAIL, {
      message: 'Vérifiez votre adresse email ! (vous@hairun-technology.com)',
    }),
    firstname: yup.string().max(255).required(),
    lastname: yup.string().max(255).required(),
    birth_date: yup.date().required(),
  })
  .required();

const CreateOrUpdateUserModal: FC<CreateModalUserProps> = ({ user, onClose }) => {
  const queryClient = useQueryClient();

  const { allowPermission } = useUserPermission();

  const [showPoste, setShowPoste] = useState(false);
  const [showType, setShowType] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messagePost, setMessagePost] = useState('');
  const [match, setMatch] = useState<string[]>([]);
  const [file, setFile] = useState<File | null | undefined>();
  const [link, setLink] = useState<string | null | undefined>(user ? user.image?.path : '');
  const [department, setDepartment] = useState<{ name: string; id: string } | undefined>();
  const [post, setPost] = useState<{ name: string; id: string } | null>(user ? user.post : null);

  const navigate = useNavigate();

  const currentUser = useContext(UserContext);
  const departmentData = useQuery({
    queryKey: [QUERY_USER_DEPARTMENT_FILTER_KEY],
    queryFn: () => http.get(DEPARTMENT.departmentWithAnonymous).then((res) => res.data),
  });
  const postData = useQuery({
    queryKey: ['post', department],
    queryFn: () => http.get(department ? `${POST}` : POST).then((res) => res.data),
    enabled: true,
  });

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(form),
    defaultValues: {
      firstname: user ? user.firstname : '',
      lastname: user ? user.lastname : '',
      birth_date: user ? new Date(user.birth_date) : new Date(),
      email: user ? user.email : '',
    },
  });

  const handleClick: SubmitHandler<{
    firstname?: string | undefined;
    lastname?: string | undefined;
    birth_date: Date | undefined;
    email: string | undefined;
  }> = async (data: {
    firstname?: string | undefined;
    lastname?: string | undefined;
    birth_date: Date | undefined;
    email: string | undefined;
  }) => {
    setIsLoading(true);
    queryClient.invalidateQueries({ queryKey: [QUERY_USER_DEPARTMENT_KEY] });

    if (!post) setMessagePost('Obligatoire *');
    if (
      data.firstname &&
      data.firstname?.trim().length > 0 &&
      data.lastname &&
      data.lastname?.trim().length > 0 &&
      data.birth_date &&
      data.email &&
      post
    ) {
      try {
        let userUpdatedOrCreated;
        if (user) {
          const formData = new FormData();
          if (file) formData.append('image', file);
          formData.append('firstname', data.firstname);
          formData.append('lastname', data.lastname);
          formData.append('birth_date', new Date(data.birth_date).toDateString());
          formData.append('post', allowPermission(PERMISSIONS.updateAll) ? post.id : user.post.id);
          userUpdatedOrCreated = await updateUser(formData, user.uuid);
        } else {
          const formData = new FormData();
          formData.append('firstname', data.firstname);
          formData.append('lastname', data.lastname);
          formData.append('birth_date', new Date(data.birth_date).toDateString());
          formData.append('email', data.email.trim());
          formData.append('password', PASSWORD_DEFAULT);
          if (file) {
            formData.append('image', file);
            formData.append('post', post.id);
            userUpdatedOrCreated = await createUser(formData);
          } else setMatch(["Vérifiez l'image"]);
        }
        if (userUpdatedOrCreated) {
          onClose();
          if (userUpdatedOrCreated.data.uuid === currentUser?.uuid) {
            window.location.reload();
          }
        }
        await queryClient.invalidateQueries({ queryKey: [QUERY_USER_KEY] });
        await queryClient.invalidateQueries({ queryKey: [QUERY_USER_DEPARTMENT_KEY] });
        await queryClient.invalidateQueries({ queryKey: [SearchType.USER] });
      } catch (error) {
        const exceptions = error as AxiosError;
        if (exceptions.code === 'ERR_NETWORK') navigate(routes.server_error.path);
        setMatch(manageErrorMessage(exceptions));
      }
    } else match.push('Vérifier les champs');
    setIsLoading(false);
  };

  return (
    <CreateModal
      onClose={onClose}
      title={!user ? 'Nouvel utilisateur' : 'Modification utilisateur'}
    >
      <form onSubmit={handleSubmit(handleClick)}>
        <div className="flex gap-4 flex-col w-full">
          <div className="container-create-modal">
            <div className="content">
              <div className="file-with-names">
                <div
                  className={file || link ? 'file' : 'file !border-red-600 !border-3 !border-solid'}
                >
                  <InputFileWithDragAndDrop
                    file={file}
                    setFile={setFile}
                    link={link}
                    setLink={setLink}
                  />
                </div>
                <div className="names">
                  <Controller
                    control={control}
                    name="firstname"
                    render={({ field: { ref, onChange, onBlur, value } }) => (
                      <Input
                        value={value.startsWith(' ') ? value.trimStart() : value}
                        additionalClass="h-1/3"
                        type="text"
                        placeholder="Nom"
                        refs={ref}
                        onChange={onChange}
                        onBlur={onBlur}
                        required
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="lastname"
                    render={({ field: { ref, onChange, onBlur, value } }) => (
                      <Input
                        value={value.startsWith(' ') ? value.trimStart() : value}
                        type="text"
                        placeholder="Prénom"
                        additionalClass="h-1/3"
                        refs={ref}
                        onChange={onChange}
                        onBlur={onBlur}
                        required
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="email"
                    render={({ field: { ref, onChange, onBlur, value } }) => (
                      <Input
                        placeholder="Adresse e-mail"
                        additionalClass={
                          (watch('email')?.match(REGEX_EMAIL) &&
                            value?.length > 0 &&
                            watch('email').trim().length > 0) ||
                          !watch('email')
                            ? twMerge('h-1/3', user ? 'bg-gray-500/20' : '')
                            : twMerge(
                                'h-1/3 !border-1 !border-red-500',
                                user ? 'bg-gray-500/20' : '',
                              )
                        }
                        type="text"
                        refs={ref}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        required
                        readonly={!!user}
                      />
                    )}
                  />

                  {watch('email') && errors && errors.email && (
                    <div className="absolute text-red-500 my-0 ml-0 font-medium text-xs flex justify-start top-full mt-1 leading-none">
                      {errors.email.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="relative">
                <div className="input-date">
                  <Controller
                    control={control}
                    name="birth_date"
                    render={({ field: { ref, onChange, onBlur } }) => (
                      <input
                        type="text"
                        id="date"
                        placeholder={
                          user ? new Date(user.birth_date).toLocaleDateString() : 'jj/mm/yyyy'
                        }
                        min="1950-01-01"
                        max={`${new Date().getFullYear()}-${
                          new Date().getMonth() + 1 < 10
                            ? `0${new Date().getMonth() + 1}`
                            : new Date().getMonth() + 1
                        }-${new Date().getDate()}`}
                        className="input"
                        onFocus={(e) => {
                          e.target.type = 'date';
                        }}
                        onBlur={(e) => {
                          if (!e.target.value) e.target.type = 'text';
                        }}
                        onChange={onChange}
                        onBlurCapture={onBlur}
                        ref={ref}
                      />
                    )}
                  />
                  <img src="/icon/date.svg" alt="date" />
                </div>
                <div
                  className={`poste-type ${
                    !allowPermission(PERMISSIONS.updateAll) ? 'cursor-not-allowed' : ''
                  }`}
                >
                  <div
                    className="poste"
                    role="presentation"
                    onClick={() => {
                      if (allowPermission(PERMISSIONS.updateAll)) setShowPoste((s) => !s);
                    }}
                  >
                    <div className="libelle">
                      {!post && messagePost ? (
                        <div className="!text-red-600">{messagePost}</div>
                      ) : (
                        <div>{!post ? 'Post' : post.name}</div>
                      )}
                      <Icon name="search" size={15} className="text-gray-500" />
                    </div>
                    {postData.isPending && 'Chargement...'}
                    {postData.error && postData.error.message}
                    {showPoste && <DropDown items={postData.data} setValue={setPost} />}
                  </div>
                  <div
                    className="type"
                    role="presentation"
                    onClick={() => {
                      if (allowPermission(PERMISSIONS.updateAll)) setShowType((s) => !s);
                    }}
                  >
                    <div className="libelle">
                      <div>
                        {!department?.name && !user?.post.department.name
                          ? 'Département'
                          : department?.name || user?.post.department.name}
                      </div>
                      <Icon name="sharp-arrow-drop-down" size={10} className="text-gray-500" />
                    </div>
                    {departmentData.isPending && 'Chargement...'}
                    {showType && (
                      <DropDown
                        items={departmentData.data || [{ name: 'No data', id: '0' }]}
                        setValue={setDepartment}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button
          title={
            <span className="flex flex-row gap-x-1">
              {user ? 'Modifier' : 'Créer'}
              {isLoading && <Spinner />}
            </span>
          }
          variant="secondary-1"
        />
        {match.map((message: string) => (
          <div className="leading-none text-red-500 my-0 ml-0 text-xs font-medium" key={message}>
            {message}
          </div>
        ))}
      </form>
    </CreateModal>
  );
};

export default CreateOrUpdateUserModal;
