/* eslint-disable jsx-a11y/label-has-associated-control */
import { FC } from 'react';

const InputCheckbox: FC<{ idCheckbox: string; isChecked: boolean }> = ({
  idCheckbox,
  isChecked,
}) => (
  <label htmlFor={idCheckbox} className="cursor-pointer">
    <input
      id={idCheckbox}
      checked={isChecked}
      type="checkbox"
      value=""
      className="sr-only peer outline-none "
    />
    <div className="relative py-1 w-7 h-[14px] bg-gray-4 peer-focus:outline-none peer-focus:ring-inset peer-focus:ring-blue-4 rounded-full dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-blue-4" />
  </label>
);

export default InputCheckbox;
