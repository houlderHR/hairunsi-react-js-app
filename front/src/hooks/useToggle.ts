import { useState } from 'react';

const useToggle = () => {
  const [state, setState] = useState(false);

  const toggle = () => {
    setState((s) => !s);
  };

  return { state, toggle };
};

export default useToggle;
