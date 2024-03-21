import React from "react";
import Icon from "./ui/Icon";

interface CardTypeProps {
  title: string;
  name: string;
  iconVisible?: boolean;
}

interface IconBoxProps {
  withOther?:boolean;
}

// CardType
const CardType: React.FC<CardTypeProps> = ({ title, name, iconVisible = false }) => {
  return <>
    <div className={`p-6 border ${iconVisible ? "border-gray-3":"border-transparent"} cursor-default group hover:border-gray-3 w-full bg-white text-gray-1 rounded-xl duration-300`}>
      <div className="flex flex-row justify-between">
        <h3 className="text-secondary truncate font-medium leading-6">{title}</h3>
        {iconVisible ? <IconBox /> : <IconBox withOther={true} />}
      </div>
      <div className="flex mt-4 flex-row justify-start gap-x-4">
        <Icon name="userGuard" height="22" width="18" />
        <p className="text-base">{name}</p>
      </div>
    </div>
  </>
}

// Icone de trash et edit chaque CardType
const IconBox:React.FC<IconBoxProps> = ({withOther}) => {
  return <>
    <div className={`flex flex-row gap-x-4 items-center group-hover:opacity-100 duration-300 ${withOther ? "opacity-0":"opacity-100"}`}>
      <Icon name="trash" height="15" width="11.67" />
      <span className="w-px h-4 bg-gray-3"></span>
      <Icon width="11.67" height="15" name="pen" />
    </div></>
}

export default CardType;