import Icon from '../../../Icon';

interface DropDownListItemProps {
  name: string;
  icon: string;
}

const DropDownListItem: React.FC<DropDownListItemProps> = ({ name, icon }) => {
  return (
    <>
      <div className="flex hover:font-medium py-3 flex-row gap-4">
        <Icon name={icon} />
        <p>{name}</p>
      </div>
    </>
  );
};

export default DropDownListItem;
