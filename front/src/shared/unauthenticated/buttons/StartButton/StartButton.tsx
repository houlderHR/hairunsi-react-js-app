import './StartButton.scss';
import { twMerge } from 'tailwind-merge';

interface ButtonProps {
  title: string;
  addClass?: string;
}

const StartButton: React.FC<ButtonProps> = ({ title, addClass }) => {
  return (
    <button
      className={twMerge(
        addClass,
        `border px-llg py-ssm border-white-300 rounded-md text-white uppercase mt-20 hover:cursor-pointer`,
      )}
    >
      {title}
    </button>
  );
};

export default StartButton;
