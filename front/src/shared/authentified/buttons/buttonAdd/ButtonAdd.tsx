import Icon from "../../../icon";


interface ButtonProps {
  additionalClass?: string;
}

const ButtonAdd: React.FC<ButtonProps> = ({ additionalClass }) => {
  return <>
    <button className={`${additionalClass} uppercase leading-3 flex flex-row gap-x-3 items-center bg-black-1 py-3.5 pl-8 pr-7 rounded text-xs text-white`}>
      <span><Icon name="add" size="12" /></span>
      <span className="hidden md:inline">CREER UN NOUVEAU TYPE</span>
    </button>
  </>
}

export default ButtonAdd;