import Icon from '../../../Icon';
import { twMerge } from 'tailwind-merge';

interface ButtonProps {
  additionalClass?: string;
}

const ButtonAdd: React.FC<ButtonProps> = ({ additionalClass = '' }) => {
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
        <span className="hidden md:inline">CREER UN NOUVEAU TYPE</span>
      </button>
    </>
  );
};

export default ButtonAdd;
