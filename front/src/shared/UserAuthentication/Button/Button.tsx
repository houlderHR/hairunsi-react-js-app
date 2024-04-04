import { FC, PropsWithChildren } from 'react';

const Button: FC<PropsWithChildren> = ({ children }) => (
  <button
    type="button"
    className="w-full bg-primary hover:bg-secondary duration-300 uppercase mt-10 text-white py-5 rounded text-sm leading-4 font-medium"
  >
    {children}
  </button>
);

export default Button;
