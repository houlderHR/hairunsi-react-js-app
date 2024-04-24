import { FC, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonType = {
  additionalClass?: string;
  disabled?: boolean;
  type: 'button' | 'submit';
};

const Button: FC<PropsWithChildren<ButtonType>> = ({
  disabled = false,
  additionalClass = '',
  type = 'submit',
  children,
}) => (
  <button
    type={type === 'submit' ? 'submit' : 'button'}
    disabled={disabled}
    className={twMerge(
      'w-full bg-primary 3xl:py-5 xl:py-4 py-3 hover:bg-secondary duration-300 uppercase mt-3 md:mt-10 text-white rounded text-xs lg:text-sm leading-4 font-medium',
      additionalClass,
    )}
  >
    {children}
  </button>
);

export default Button;
