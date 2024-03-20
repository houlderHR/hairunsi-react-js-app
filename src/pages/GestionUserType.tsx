import Icon from "../components/ui/Icon";
import Sidebar from "../components/Sidebar";
import View from "../components/View";

const GestionUserType = () => {
  return <>
    <div className="h-full">
      <div className="py-2 flex items-center pl-5 border-b bg-white border-gray-2 shadow-sm">
        <div className="flex gap-3 items-center">
          <Icon size="24.5" name="userSettings" />
          <div className="flex flex-col justify-start items-start">
            <h2 className="text-normal text-black-1 font-medium leading-4">Gestion des utilisateurs</h2>
            <p className="text-gray-1 text-[10px] leading-3">Lister et gérer les utilisateurs</p>
          </div>
        </div>
      </div>
      <Sidebar />
      <View />
    </div>
  </>
}

export default GestionUserType;