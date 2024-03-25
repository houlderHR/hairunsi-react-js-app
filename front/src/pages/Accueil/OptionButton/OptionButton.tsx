import { Link } from 'react-router-dom';
import './style.scss';

interface ObjProps {
  path: string;
  title: string;
  src: string;
}

const OptionButton = (props: ObjProps) => {
  return (
    <Link to={props.path}>
      <div className="button-option-container">
        <img src={props.src} alt="projet" className="button-option-image" />
        <div className="button-option-label">{props.title}</div>
      </div>
    </Link>
  );
};

export default OptionButton;
