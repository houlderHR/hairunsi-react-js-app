import React from "react";
import Icon from "../../../../shared/Icon";
import IconCardType from "./IconCardType";

interface CardTypeProps {
  title: string;
  name: string;
  iconVisible?: boolean;
}

// CardType
const CardType: React.FC<CardTypeProps> = ({ title, name, iconVisible = false }) => {
  return <>
    <div className={`p-6 border ${iconVisible ? "border-gray-3":"border-transparent"} cursor-default group hover:border-gray-3 w-full bg-white text-gray-1 rounded-xl duration-300`}>
      <div className="flex flex-row justify-between">
        <h3 className="text-secondary truncate font-medium leading-6">{title}</h3>
        {iconVisible ? <IconCardType /> : <IconCardType withOther={true} />}
      </div>
      <div className="flex mt-4 flex-row justify-start gap-x-4">
        <Icon name="userGuard" height="22" width="18" />
        <p className="text-base">{name}</p>
      </div>
    </div>
  </>
}

export default CardType;