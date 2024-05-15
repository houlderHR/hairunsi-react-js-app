import './index.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { FC, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import * as yup from 'yup';
import updateUser, { createUser } from '../../../../../hooks/user';
import { DEPARTMENT, POST } from '../../../../../routes/endpoints';
import routes from '../../../../../routes/paths';
import Button from '../../../../../shared/authenticated/buttons/Button';
import CreateModal from '../../../../../shared/authenticated/Modal/CreateModal';
import DropDown from '../../../../../shared/authenticated/Modal/DropDown';
import Icon from '../../../../../shared/Icon';
import Input from '../../../../../shared/inputs/Input';
import InputFileWithDragAndDrop from '../../../../../shared/inputs/InputFileWithDragAndDrop';
import http from '../../../../../utils/http-common';
import manageErrorMessage from '../../../../../utils/manageError';
import { REGEX_EMAIL } from '../../../../../utils/regex';
import ObjDetail from '../../obj-detail';

const PASSWORD_DEFAULT = 'HairunTest@123.';
interface CreateModalUserProps {
  user: ObjDetail | null;
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

  const [showPoste, setShowPoste] = useState(false);
  const [showType, setShowType] = useState(false);
  const [messageDepartment, setMessageDepartment] = useState('');
  const [messagePost, setMessagePost] = useState('');
  const [match, setMatch] = useState<string[]>([]);
  const [file, setFile] = useState<File | null | undefined>();
  const [link, setLink] = useState<string | null | undefined>(user ? user.image?.path : '');
  const [department, setDepartment] = useState<{ name: string; id: string } | undefined>();
  const [post, setPost] = useState<{ name: string; id: string } | null>(user ? user.post : null);

  const navigate = useNavigate();

  const departmentData = useQuery({
    queryKey: ['department'],
    queryFn: () => http.get(DEPARTMENT).then((res) => res.data),
  });
  const postData = useQuery({
    queryKey: ['post', department],
    queryFn: () =>
      http
        .get(department ? `${POST}/${DEPARTMENT}/${department.id}` : POST)
        .then((res) => res.data),
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
    queryClient.invalidateQueries({ queryKey: ['user_department'] });
    if (!department) setMessageDepartment('Obligatoire * ');
    if (!post) setMessagePost('Obligatoire *');
    if (data.firstname && data.lastname && data.birth_date && data.email && post) {
      try {
        let userUpdatedOrCreated;
        if (user) {
          const formData = new FormData();
          if (file) formData.append('image', file);
          formData.append('firstname', data.firstname);
          formData.append('lastname', data.lastname);
          formData.append('birth_date', new Date(data.birth_date).toDateString());
          formData.append('post', post.id);

          userUpdatedOrCreated = await updateUser(formData, user.uuid);
          queryClient.invalidateQueries({ queryKey: ['user'] });
        } else {
          const formData = new FormData();
          formData.append('firstname', data.firstname);
          formData.append('lastname', data.lastname);
          formData.append('birth_date', new Date(data.birth_date).toDateString());
          formData.append('email', data.email);
          formData.append('password', PASSWORD_DEFAULT);
          if (file) {
            formData.append('image', file);
            formData.append('post', post.id);
            userUpdatedOrCreated = await createUser(formData);
            queryClient.invalidateQueries({ queryKey: ['user'] });
          } else setMatch(["Vérifiez l'image"]);
        }
        if (userUpdatedOrCreated) {
          onClose();
        }
      } catch (error) {
        const exceptions = error as AxiosError;
        if (exceptions.code === 'ERR_NETWORK') navigate(routes.server_error.path);
        setMatch(manageErrorMessage(exceptions));
      }
    }
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
                        value={value}
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
                        value={value}
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
                          (watch('email')?.match(REGEX_EMAIL) && value?.length > 0) ||
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
                <div className="poste-type">
                  <div
                    className="poste"
                    role="presentation"
                    onClick={() => setShowPoste((s) => !s)}
                  >
                    <div className="libelle">
                      {messagePost ? (
                        <div className="!text-red-600">{messagePost}</div>
                      ) : (
                        <div>{!post ? 'Post' : post.name}</div>
                      )}
                      <Icon name="search" size={15} className="text-gray-500" />
                    </div>
                    {postData.isPending && 'Chargement...'}
                    {postData.error && postData.error.message}
                    {showPoste && department && (
                      <DropDown
                        items={postData.data || [{ name: 'No data', id: '0' }]}
                        setValue={setPost}
                      />
                    )}
                  </div>
                  <div className="type" role="presentation" onClick={() => setShowType((s) => !s)}>
                    <div className="libelle">
                      {messageDepartment ? (
                        <div className="!text-red-600">{messageDepartment}</div>
                      ) : (
                        <div>
                          {!department?.name && !user?.post.department.name
                            ? 'Département'
                            : department?.name || user?.post.department.name}
                        </div>
                      )}

                      <Icon name="sharp-arrow-drop-down" size={10} className="text-gray-500" />
                    </div>
                    {departmentData.isPending && 'Chargement...'}
                    {departmentData.error && departmentData.error.message}
                    {showType && (
                      <DropDown
                        items={departmentData.data || [{ name: 'No data', id: '0' }]}
                        setValue={setDepartment}
                        onClickItem={() => setPost(null)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button title={user ? 'Modifier' : 'Créer'} variant="secondary-1" />
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
