import { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import Icon from '../../../Icon';

interface CustomizableButtonProps {
  icon?: string;
  title: string;
  addClass?: string;
  iconSize?: number;
  onClick: () => void;
}

const CustomizableButton: FC<CustomizableButtonProps> = ({
  icon,
  title,
  addClass,
  onClick,
  iconSize = 14,
}) => (
  <button
    type="button"
    className={twMerge(
      addClass,
      'w-full rounded uppercase flex justify-center  flex-row py-3 justify-items-center gap-6',
    )}
    onClick={onClick}
  >
    {icon && (
      <span className="mt-1">
        <Icon name={icon} size={iconSize} />
      </span>
    )}
    <span className="">{title}</span>
  </button>
);

export default CustomizableButton;
