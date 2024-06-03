import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

type TextAreaProps = {
  placeholder: string;
  classNames?: string;
};

const TextArea: FC<TextAreaProps> = ({ placeholder, classNames }) => (
  <textarea
    className={twMerge(
      'rounded border text-base border-gray-9 p-4 w-full leading-3 focus:placeholder:opacity-0 focus:outline-none focus:border-secondary cursor-pointer min-h-[148px] resize-none',
      classNames,
    )}
    placeholder={placeholder}
  />
);

export default TextArea;
