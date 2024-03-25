import { Link } from 'react-router-dom';

interface ButtonProps {
  title: String,
  addClass?: String,
}

const UnauthButton: React.FC<ButtonProps> = ({title,addClass}) => {
  return (
      <button className={`${addClass} border border-white-300 rounded-md text-white uppercase mt-20 hover:cursor-pointer start-button`}>
        {title}
      </button>
  );
}

export default UnauthButton;