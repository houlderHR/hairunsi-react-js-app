import { Link } from 'react-router-dom';
import './Button.scss';

interface ButtonProps {
  title: String,
  addClass?: String,
}

const StartButton: React.FC<ButtonProps> = ({title,addClass}) => {
  return (
    <button className={`${addClass} border px-llg py-ssm border-white-300 rounded-md text-white uppercase mt-20 hover:cursor-pointer`}>
      {title}
    </button>
  );
}

export default StartButton;