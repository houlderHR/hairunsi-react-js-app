import { FC, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import Icon from '../../../Icon';

enum ButtonVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SECONDARY_1 = 'secondary-1',
  DANGER = 'danger',
}

interface ButtonProps {
  icon?: string;
  title: string | ReactNode;
  className?: string;
  classTitle?: string;
  variant?: string;
  iconSize?: number;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
  onSubmit?: () => void;
}

const Button: FC<ButtonProps> = ({
  icon,
  title,
  className,
  classTitle,
  onClick,
  onSubmit,
  variant,
  type = 'submit',
  disabled,
  iconSize = 14,
}) => {
  let classNameValue: string = '';
  switch (variant) {
    case ButtonVariant.PRIMARY:
      classNameValue =
        'w-full rounded flex justify-center py-3 bg-primary text-white font-medium justify-items-center gap-6';
      break;
    case ButtonVariant.SECONDARY:
      classNameValue =
        'md:min-w-60 hover:bg-secondary duration-300 leading-3 flex flex-row gap-x-3 justify-center items-center bg-black-1 py-3.5 pl-8 pr-7 rounded text-xs text-white';
      break;
    case ButtonVariant.SECONDARY_1:
      classNameValue =
        'w-full bg-secondary py-4 text-sm rounded flex justify-center mt-4 font-medium duration-300 text-base text-white';
      break;
    case ButtonVariant.DANGER:
      classNameValue =
        'w-full rounded flex justify-center py-3 bg-danger-2 text-white text-white font-medium justify-items-center gap-6';
      break;
    default:
      classNameValue =
        'w-full rounded flex justify-center py-3 bg-transparent border border-gray-1 text-black-1 justify-items-center gap-6';
      break;
  }

  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      className={twMerge(className, classNameValue)}
      onClick={onClick}
      onSubmit={onSubmit}
      disabled={disabled}
    >
      {icon && (
        <span>
          <Icon name={icon} size={iconSize} />
        </span>
      )}
      <span className={classTitle}>{title}</span>
    </button>
  );
};

export default Button;
