import './style.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import HeadManager from '../../shared/authenticated/HeadManager';
import Modal from '../../shared/authenticated/Modal';
import Input from '../../shared/inputs/Input';
import InputFileWithDragAndDrop from '../../shared/inputs/InputFileWithDragAndDrop';
import Head from './Head';
import List from './List';

const form = yup
  .object()
  .shape({
    name: yup.string().max(255).required(),
    description: yup.string().max(255).required(),
  })
  .required();

const Project = () => {
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState<File | null | undefined>();

  const pushSearchPrjoject = () => [];
  const { handleSubmit, control, watch } = useForm({
    resolver: yupResolver(form),
    defaultValues: {
      name: '',
      description: '',
    },
  });
  return (
    <div className="container-project">
      <div className="w-full h-auto flex flex-col justify-start items-center pt-14">
        <Head />
        <div className="content">
          <div className="filter sticky top-32 z-50">
            <HeadManager
              title="CREER UN NOUVEAU PROJET"
              onOpen={() => setShowModal(true)}
              pushSearch={pushSearchPrjoject}
            />
          </div>
          <List />
        </div>
      </div>
      {showModal && (
        <Modal title="Créer un projet" onClose={() => setShowModal(false)}>
          <div className="flex flex-col space-y-4">
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
              <div className="flex flex-col justify-between items-center w-2/3 space-y-3">
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { ref, onChange, onBlur, value } }) => (
                    <Input
                      value={value.startsWith(' ') ? value.trimStart() : value}
                      type="text"
                      placeholder="Nom du projet"
                      additionalClass="h-14"
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
                      additionalClass="h-28 !pt-0"
                      refs={ref}
                      onChange={onChange}
                      onBlur={onBlur}
                      required
                    />
                  )}
                />
              </div>
            </div>
            <div className="flex flex-row justify-center items-center text-gray-1 mb-1 gap-8">
              <div>
                <label className="flex flex-row items-center gap-2" htmlFor="type">
                  <input
                    type="radio"
                    name=""
                    id="type"
                    className="w-[18px] h-[18px] form-radio accent-[#3B88FF]"
                  />
                  <span className="text-sm lg:text-sm inline-block">Régie</span>
                </label>
              </div>
              <div>
                <label className="flex flex-row items-center gap-2" htmlFor="type">
                  <input
                    type="radio"
                    name=""
                    id="type"
                    className="w-[18px] h-[18px] form-radio accent-[#3B88FF]"
                  />
                  <span className="text-sm lg:text-sm inline-block">Forfait</span>
                </label>
              </div>
              <div>
                <label className="flex flex-row items-center gap-2" htmlFor="type">
                  <input
                    type="radio"
                    name=""
                    id="type"
                    className="w-[18px] h-[18px] form-radio accent-[#3B88FF]"
                  />
                  <span className="text-sm lg:text-sm inline-block">Interne</span>
                </label>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Project;
