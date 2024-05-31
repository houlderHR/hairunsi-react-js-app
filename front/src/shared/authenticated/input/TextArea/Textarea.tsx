import { FC } from 'react';

type TextAreaProps = {
  placeholder: string;
};

const TextArea: FC<TextAreaProps> = ({ placeholder }) => (
  <textarea
    className="rounded border text-base border-gray-9 p-4 w-full leading-3 focus:placeholder:opacity-0 focus:outline-none focus:border-secondary cursor-pointer min-h-[148px] resize-none"
    placeholder={placeholder}
  />
);

export default TextArea;
