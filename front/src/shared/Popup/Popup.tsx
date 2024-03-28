import { FC } from 'react';

interface PopupProps {
  name: string;
}

<<<<<<< HEAD
const Popup: FC<PopupProps> = ({ name }) => (
=======
const PopupMenu: React.FC<PopupProps> = ({ name }) => (
>>>>>>> c1e59ef (fix:lint config)
  <div className="px-3 border md:hidden text-black-1 absolute left-full ml-4 hidden group-hover:block sm:group-hover:hidden border-gray-200 rounded bg-gray-50 py-2">
    {name}
  </div>
);

export default Popup;
