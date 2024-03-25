interface PopupProps {
  name: string;
}

const PopupMenu: React.FC<PopupProps> = ({ name }) => {
  return (
    <>
      <div className="px-3 border md:hidden text-black-1 absolute left-full ml-4 hidden group-hover:block sm:group-hover:hidden border-gray-200 rounded bg-gray-50 py-2">
        {name}
      </div>
    </>
  );
};

export default PopupMenu;
