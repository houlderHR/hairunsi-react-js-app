import { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import Icon from '../../../Icon';
import { ModalShowStateType } from '../../Modal';

interface ButtonAddProps {
  additionalClass?: string;
<<<<<<< HEAD
  title: string;
  openModal: React.Dispatch<React.SetStateAction<ModalShowStateType>>;
}

const ButtonAdd: FC<ButtonAddProps> = ({ openModal, title, additionalClass = '' }) => (
  <button
    type="button"
    onClick={() => openModal(ModalShowStateType.CREATE)}
    className={twMerge(
      additionalClass,
      'uppercase leading-3 flex flex-row gap-x-3 items-center bg-black-1 py-3.5 pl-8 pr-7 rounded text-xs text-white',
    )}
  >
    <span>
      <Icon name="add" size={12} />
    </span>
    <span className="hidden md:inline">{title}</span>
  </button>
);
=======
  title?: string;
}

const ButtonAdd: React.FC<ButtonProps> = ({ additionalClass = '', title = '' }) => {
  const classes = twMerge(
    additionalClass,
    'uppercase leading-3 flex flex-row gap-x-3 items-center bg-black-1 py-3.5 pl-8 pr-7 rounded text-xs text-white',
  );

  return (
    <>
      <button className={classes}>
        <span>
          <Icon name="add" size="12" />
        </span>
        <span className="hidden md:inline">{title}</span>
      </button>
    </>
  );
};
>>>>>>> 84c509c (feat: refact components and create card role manager)

export default ButtonAdd;
