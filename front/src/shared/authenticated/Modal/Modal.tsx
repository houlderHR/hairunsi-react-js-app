import { FC, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import Icon from '../../Icon';

export enum ModalShowStateType {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  CLOSE = 'CLOSE',
}

interface ModalProps {
  title?: string;
  onClose: () => void;
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({ children, title, onClose }) => (
  <>
    {createPortal(
      <div className="fixed z-[100] top-0 h-full w-full flex items-center justify-center">
        <div className="bg-black opacity-[16%] h-full w-full absolute top-0" />
        <div className="bg-white shadow-xl rounded-lg lg:w-1/3 md:w-1/2 w-3/4 py-4 px-[26px] z-30">
          <div className="flex flex-row justify-between items-center mb-12">
            <h3 className="text-secondary text-[22px] font-medium">{title}</h3>
            <span role="presentation" onClick={onClose} className="cursor-pointer">
              <Icon name="x" size={15.25} />
            </span>
          </div>
          {children}
        </div>
      </div>,
      document.body,
    )}
  </>
);

export default Modal;
