import { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import Icon from '../../Icon';
import InputIcon from '../InputIcon';

type InputDateProps = {
  additionalInputClass?: string;
  additionalClass?: string;
};

const InputDate: FC<InputDateProps> = ({ additionalInputClass, additionalClass }) => (
  <InputIcon
    additionalInputClass={twMerge('py-5 placeholder:text-gray-1', additionalInputClass)}
    additionalClass={twMerge(
      'text-gray-1 !focus:bg-gray-3 !hover:bg-gray-3 !bg-white border border-gray-9 text-base text-gray-1 ',
      additionalClass,
    )}
    endIcon={<Icon name="calendar" />}
    placeholder={new Date().toLocaleDateString('en-US')}
  />
);

export default InputDate;
