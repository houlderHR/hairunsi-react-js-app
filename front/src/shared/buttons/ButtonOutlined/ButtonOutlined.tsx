import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps {
  title: string;
  addClass?: string;
}

const ButtonOutlined: FC<ButtonProps> = ({ title, addClass }) => (
  <button
    type="button"
    className={twMerge(
      addClass,
      `border px-ssm py-2.5 text-[12px] lg:px-llg lg:py-ssm lg:text-[16px] border-white-300 rounded-md text-white uppercase mt-20 hover:cursor-pointer`,
    )}
  >
    {title}
  </button>
);

export default ButtonOutlined;
