import Icon from "./ui/Icon";

interface DropDownListItemProps {
  name: string;
  icon:string;
}

const Dropdown = () => {
  return <>
    <div className="flex flex-col px-3">
        <DropDownListItem name="Modifier le profil" icon="userNotification"/>
        <span className="h-[0.15px] opacity-30 bg-gray-50 w-full block"></span>
        <DropDownListItem name="Déconnexion" icon="logout" />
    </div>
  </>
}

const DropDownListItem: React.FC<DropDownListItemProps> = ({name,icon}) => {
  return <>
    <div className="flex hover:font-medium py-3 flex-row gap-4">
      <Icon name={icon} />
      <p>{name}</p>
    </div>
  </>
}

export default Dropdown;