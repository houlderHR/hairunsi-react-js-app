import { FC, PropsWithChildren } from 'react';
import Modal from '..';

interface UpdateModalProps {
  onClose: () => void;
  title: string;
}

const UpdateModal: FC<PropsWithChildren<UpdateModalProps>> = ({ children, title, onClose }) => (
  <Modal onClose={onClose} title={title}>
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
