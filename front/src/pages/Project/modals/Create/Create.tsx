import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import Modal from '../../../../shared/authenticated/Modal';
import Input from '../../../../shared/inputs/Input';
import InputFileWithDragAndDrop from '../../../../shared/inputs/InputFileWithDragAndDrop';
import TypesProjectExcludingAll from '../TypesProjectIncludingAll/TypesProjectExcludingtAll';

interface ICreate {
  onClose: () => void;
}

const form = yup
  .object()
  .shape({
    name: yup.string().max(255).required(),
    description: yup.string().max(255).required(),
    client: yup.string().max(255).required(),
  })
  .required();

const Create: FC<ICreate> = ({ onClose }) => {
  const [file, setFile] = useState<File | null | undefined>();
  const typeProject = useRef<string | null>();

  const { handleSubmit, control, watch } = useForm({
    resolver: yupResolver(form),
    defaultValues: {
      name: '',
      description: '',
      client: '',
    },
  });

  const handleClick: SubmitHandler<{
    name: string;
    description: string;
    client: string;
  }> = (data: { name: string; description: string; client: string }) => {
    (document.getElementsByName('project') as NodeListOf<HTMLInputElement>)?.forEach((element) => {
      if (element.checked) {
        typeProject.current = element.value;
      }
    });

    if (file && typeProject.current) {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('client', data.client);
      formData.append('image', file);
      formData.append('type', typeProject.current);
    }
  };
  return (
    <Modal title="Créer un projet" onClose={onClose}>
      <form className="flex flex-col justify-center space-y-4" onSubmit={handleSubmit(handleClick)}>
        <div className="flex flex-row justify-evenly items-stretch space-x-3">
          <div
            className={
              file
                ? 'h-auto flex flex-col justify-center items-center w-1/3 border border-dashed border-gray-500 rounded-md'
                : 'h-auto flex flex-col justify-center items-center w-1/3 border rounded-md !border-red-600 !border-3 !border-solid'
            }
          >
            <InputFileWithDragAndDrop file={file} setFile={setFile} />
          </div>
          <div className="flex flex-col justify-between items-center w-2/3 space-y-1">
            <Controller
              control={control}
              name="name"
              render={({ field: { ref, onChange, onBlur, value } }) => (
                <Input
                  value={value.startsWith(' ') ? value.trimStart() : value}
                  type="text"
                  placeholder="Nom du projet"
                  additionalClass="!h-[56px]"
                  refs={ref}
                  onChange={onChange}
                  onBlur={onBlur}
                  required
                />
              )}
            />
            <Controller
              control={control}
              name="description"
              render={({ field: { ref, onChange, onBlur, value } }) => (
                <Input
                  value={value.startsWith(' ') ? value.trimStart() : value}
                  type="text"
                  placeholder="Description"
                  additionalClass="!h-[112px] !pt-0"
                  refs={ref}
                  onChange={onChange}
                  onBlur={onBlur}
                  required
                />
              )}
            />
            <Controller
              control={control}
              name="client"
              render={({ field: { ref, onChange, onBlur, value } }) => (
                <Input
                  value={value.startsWith(' ') ? value.trimStart() : value}
                  type="text"
                  placeholder="Client"
                  additionalClass="!h-[56px]"
                  refs={ref}
                  onChange={onChange}
                  onBlur={onBlur}
                  required
                />
              )}
            />
          </div>
        </div>
        <div className="flex flex-row">
          <div className="w-1/3" />
          <div className="w-2/3 flex flex-row justify-start items-center text-gray-1 mb-1 gap-8">
            <TypesProjectExcludingAll />
          </div>
        </div>
        <div className="flex flex-col relative 2xl:mb-20 mb-10">
          <button
            type="submit"
            className={
              !watch('name') || !watch('description') || !watch('client')
                ? 'mt-1 px-2 py-3 text-sm border text-white text-[14px] rounded-md bg-[#DEDEDE] !cursor-not-allowed'
                : 'mt-1 px-2 py-3 text-sm border text-white text-[14px] rounded-md bg-primary'
            }
          >
            Créer
          </button>
          {/* <div className="absolute top-full mt-1 flex flex-col justify-start items-start text-start">
                {!errors.email &&
                  match.map((message: string) => (
                    <div
                      className="leading-none text-red-500 my-0 ml-0 text-xs font-medium"
                      key={message}
                    >
                      {message}
                    </div>
                  ))}
              </div> */}
        </div>
      </form>
    </Modal>
  );
};

export default Create;
