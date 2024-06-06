import { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import Icon from '../../../../../../shared/Icon';
import Input from '../../../../../../shared/inputs/Input';

type InputItemProps = {
  onClose: () => void;
  onEdit: () => void;
  item?: { label: string; value: string };
  inputContainerClassName?: string;
};

const InputItem: FC<InputItemProps> = ({ onClose, onEdit, item, inputContainerClassName }) => (
  <form>
    <div className="flex flex-row gap-x-6 text-gray-1 cursor-pointer">
      <div className="flex flex-row gap-x-2">
        <input type="radio" id="link" name="link" value="otherLink" onChange={() => {}} />
        <span>Autres liens</span>
      </div>
      <div className="flex flex-row gap-x-2">
        <input type="radio" id="sketch" name="link" value="sketch" onChange={() => {}} />
        <span>Maquettes</span>
      </div>
    </div>
    <div className={twMerge('flex flex-row mt-3 gap-x-4', inputContainerClassName)}>
      <Input placeholder="Libellé" type="text" value={item?.label} onChange={() => {}} />
      <Input placeholder="Lien" type="text" value={item?.value} onChange={() => {}} />
      <div className="flex flex-row gap-x-4 items-center">
        <Icon
          name="x"
          size={18}
          onClick={onClose}
          className="hover:text-red-500 cursor-pointer duration-150"
        />
        <Icon
          name="check"
          width={18}
          height={30}
          className="hover:text-secondary-2 cursor-pointer duration-150"
          onClick={onEdit}
        />
      </div>
    </div>
  </form>
);

export default InputItem;
