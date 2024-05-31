import Icon from '../../../shared/Icon';

const Head = () => (
  <div className="fixed w-full z-40">
    <div className="py-2 flex items-center pl-5 border-b bg-white z-0 border-gray-2 shadow-sm">
      <div className="flex gap-3 items-center">
        <Icon size={24.5} name="rocket-icon" />
        <div className="flex flex-col justify-sd tart items-start">
          <h2 className="text-normal text-black-1 font-medium leading-4">Projets</h2>
          <p className="text-gray-1 text-[10px] leading-3">Lister et gérer les projets</p>
        </div>
      </div>
    </div>
  </div>
);

export default Head;
