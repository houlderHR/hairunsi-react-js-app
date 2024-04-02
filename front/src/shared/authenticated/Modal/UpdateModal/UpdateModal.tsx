import React, { FC, PropsWithChildren } from 'react';
import Modal from '..';
import { ModalShowStateType } from '../Modal';

interface UpdateModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<ModalShowStateType>>;
  title: string;
}

const UpdateModal: FC<PropsWithChildren<UpdateModalProps>> = ({
  children,
  title,
  setShowModal,
}) => (
  <Modal setShowModal={setShowModal} title={title}>
    {children}
    <button
      type="button"
      className="w-full bg-secondary py-4 text-sm rounded mt-4 hover:bg-primary font-medium duration-300 text-base text-white"
    >
      Modifier
    </button>
  </Modal>
);

export default UpdateModal;
