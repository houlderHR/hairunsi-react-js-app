import { FC } from 'react';
import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker';

type InputDateProps = {
  date: DateValueType;
  onChange: (value: DateValueType, e?: HTMLInputElement | null | undefined) => void;
  placeholder?: string;
};

const InputDate: FC<InputDateProps> = ({ date, onChange, placeholder }) => (
  <div className="border border-gray-9 w-full rounded hover:border-secondary-2 cursor-pointer">
    <Datepicker
      useRange={false}
      displayFormat="DD MMM YYYY"
      popoverDirection="down"
      placeholder={placeholder}
      asSingle
      inputClassName="py-4 text-xs focus:outline-none cursor-pointer pl-4 w-full"
      onChange={onChange}
      value={date}
      primaryColor="blue"
      i18n="fr-FR"
      showShortcuts={false}
    />
  </div>
);

export default InputDate;
