import { FC, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Icon from '../../../../Icon';
import InputIcon from '../../../../inputs/InputIcon';
import DropDown from '../../Dropdown';
import { DataDelay, DataUser } from './constant';

type ItemProp = {
  onDelete: () => void;
  additionalClass?: string;
};

const Item: FC<ItemProp> = ({ onDelete, additionalClass }) => {
  const [showDelay, setShowDelay] = useState(false);
  const [showCollaborator, setShowCollaborator] = useState(false);
  const [colaborator, setColaborator] = useState<{ id: string; name: string; email: string }>();
  const [delay, setDelay] = useState<{ id: string; name: string }>();

  return (
    <div className={twMerge('flex flex-row gap-x-4 items-center justify-center', additionalClass)}>
      <div className="relative" role="presentation" onClick={() => setShowCollaborator((s) => !s)}>
        <InputIcon
          additionalClass="hover:bg-gray-100"
          additionalInputClass="py-5"
          onChange={() => {}}
          value={colaborator?.name ?? ''}
          endIcon={colaborator ? <Icon name="x" onClick={() => setColaborator(undefined)} /> : null}
          placeholder="search"
          icon="search"
        />
        {showCollaborator && (
          <DropDown>
            {DataUser.map((item) => (
              <li
                className="xl:px-8 cursor-pointer py-2 hover:bg-gray-50 rounded-md flex flex-col truncate"
                key={item.id}
                role="presentation"
                onClick={() => setColaborator(item)}
              >
                {item.name}
                <span className="text-secondary-2 text-xs">{item.email}</span>
              </li>
            ))}
          </DropDown>
        )}
      </div>
      <div className="relative" role="presentation" onClick={() => setShowDelay((d) => !d)}>
        <InputIcon
          onChange={() => {}}
          additionalClass="hover:bg-gray-100"
          additionalInputClass="py-5"
          placeholder="Temp écoulé"
          value={delay?.name ?? ''}
          endIcon={<Icon className="text-gray-1" name="sharp-arrow-drop-down" />}
          type="text"
        />
        {showDelay && (
          <DropDown>
            {DataDelay.map((_delay) => (
              <li
                className="xl:px-8 cursor-pointer py-2 hover:bg-gray-50 rounded-md"
                key={_delay.id}
                role="presentation"
                onClick={() => setDelay(_delay)}
              >
                {_delay.name}
              </li>
            ))}
          </DropDown>
        )}
      </div>
      <span>
        <Icon
          onClick={onDelete}
          className="hover:text-red-500 font-medium stroke-2 text-gray-1 cursor-pointer duration-150"
          name="x"
        />
      </span>
    </div>
  );
};

export default Item;
