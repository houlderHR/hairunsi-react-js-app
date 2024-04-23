import { FC } from 'react';
import { ChangeHandler, RefCallBack } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

interface InputProps {
  placeholder: string;
  type: string;
  additionalClass?: string;
  value?: string;
  name: string;
  refs: RefCallBack;
  onChange?: ChangeHandler;
  onBlur: ChangeHandler;
  required: boolean;
}

const Input: FC<InputProps> = ({
  refs,
  name,
  placeholder,
  type,
  additionalClass,
  onChange,
  onBlur,
  value = '',
  required,
}) => (
  <input
    name={name}
    ref={refs}
    className={twMerge(
      additionalClass,
      'rounded border border-gray-1 p-4 w-full leading-3 focus:placeholder:opacity-0 focus:outline-none focus:border-secondary cursor-pointer',
    )}
    defaultValue={value}
    type={type}
    placeholder={placeholder}
    onChange={onChange}
    onBlur={onBlur}
    required={required}
  />
);

export default Input;
