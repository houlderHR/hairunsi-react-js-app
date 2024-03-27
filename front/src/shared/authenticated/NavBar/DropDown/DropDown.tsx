import DropDownListItem from './DropDownListItem';

const DropDown = () => {
  return (
    <>
      <div className="flex flex-col z-10 relative px-3">
        <DropDownListItem name="Modifier le profil" icon="user-notification" />
        <span className="h-[0.15px] opacity-30 bg-gray-50 w-full block"></span>
        <DropDownListItem name="Déconnexion" icon="logout" />
      </div>
    </>
  );
};

export default DropDown;
