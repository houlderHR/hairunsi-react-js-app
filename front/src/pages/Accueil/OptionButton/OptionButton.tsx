import './style.scss';
import { FC } from 'react';
import { Link } from 'react-router-dom';

interface ObjProps {
  path: string;
  title: string;
  src: string;
}

const OptionButton: FC<ObjProps> = ({ path, src, title }) => (
  <Link to={path}>
    <div className="button-option-container">
      <img src={src} alt="projet" className="button-option-image" />
      <div className="button-option-label">{title}</div>
    </div>
  </Link>
);

export default OptionButton;
