import './style.scss';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../shared/Icon';
import PopupNotification from '../PopupNotification';

interface ObjProps {
  path: string;
  title: string;
  src: string;
}

const OptionButton: FC<ObjProps> = ({ path, src, title }) => (
  <Link to={path}>
    <div className="button-option-container hover:text-secondary-2">
      <Icon name={src} className="button-option-image" />
      <div className="button-option-label">{title}</div>
      {title === 'Congé' && <PopupNotification />}
    </div>
  </Link>
);

export default OptionButton;
