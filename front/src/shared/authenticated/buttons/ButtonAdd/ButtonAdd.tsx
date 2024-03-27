import { ModalShowState } from '../../../../utils/type/ModalShowType';
import Icon from '../../../Icon';
import { twMerge } from 'tailwind-merge';

interface ButtonAddProps {
  additionalClass?: string;
  title: string;
  openModal: React.Dispatch<React.SetStateAction<ModalShowState>>;
}

const ButtonAdd: React.FC<ButtonAddProps> = ({ openModal, title, additionalClass = '' }) => {
  const classes = twMerge(
    additionalClass,
    'uppercase leading-3 flex flex-row gap-x-3 items-center bg-black-1 py-3.5 pl-8 pr-7 rounded text-xs text-white',
  );

  return (
    <>
      <button
        onClick={() => openModal((s: ModalShowState) => ({ ...s, create: true }))}
        className={classes}
      >
        <span>
          <Icon name="add" size="12" />
        </span>
        <span className="hidden md:inline">{title}</span>
      </button>
    </>
  );
};

export default ButtonAdd;
