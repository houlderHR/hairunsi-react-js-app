import { twMerge } from 'tailwind-merge';

interface InputProps {
  placeholder: string;
  type: string;
  additionalClass?: string;
}

const Input: React.FC<InputProps> = ({ placeholder, type, additionalClass }) => {
  const classes = twMerge(
    additionalClass,
    'rounded border border-gray-1 p-4 w-full leading-3 focus:placeholder:opacity-0 focus:outline-none focus:border-secondary cursor-pointer',
  );

  return (
    <>
      <input type={type} placeholder={placeholder} className={classes} />
    </>
  );
};

export default Input;
