import { FC, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Icon from '../../../../Icon';
import InputIcon from '../../../../inputs/InputIcon';
import DropDown from '../../Dropdown';

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
            {[
              { id: '1', name: 'John Doe', email: 'JohnDoe@mail.com' },
              { id: '2', name: 'John Doe 2', email: 'JohnDoe2@hairun-technology.com' },
              { id: '3', name: 'John Doe 3', email: 'JohnDoe3@hairun-technology.com' },
              { id: '4', name: 'John Doe 4', email: 'JohnDoe4@hairun-technology.com' },
              { id: '5', name: 'John Doe 5', email: 'JohnDoe5@hairun-technology.com' },
              { id: '6', name: 'John Doe 6', email: 'JohnDoe6@hairun-technology.com' },
            ].map((item) => (
              <li
                className="px-8 cursor-pointer py-2 hover:bg-gray-50 rounded-md flex flex-col"
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
            {[
              { id: '1', name: '0,25 J/H' },
              { id: '2', name: '0,5 J/H' },
              { id: '3', name: '0,75 J/H' },
              { id: '4', name: '1 J/H' },
              { id: '5', name: '1,25 J/H' },
              { id: '6', name: '1,5 J/H' },
            ].map((_delay) => (
              <li
                className="px-8 cursor-pointer py-2 hover:bg-gray-50 rounded-md"
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
        <Icon onClick={onDelete} className="hover:text-red-500 font-medium stroke-2" name="x" />
      </span>
    </div>
  );
};

export default Item;
