import { FC } from 'react';
import Card from '../Card';
import CardItemRole from './CardItemRole';

interface CardRoleProps {
  title: string;
  items: string[];
  maxElement: number;
  iconVisible?: boolean;
}

const CardRole: FC<CardRoleProps> = ({ title, items, maxElement, iconVisible = false }) => (
  <Card title={title} iconVisible={iconVisible}>
    <div className="flex mt-4 gap-2 flex-wrap justify-start">
      {items
        .filter((item, index) => index < maxElement)
        .map((item) => (
          <CardItemRole addClass="rounded border-secondary-3 " title={item} key={item} />
        ))}
      ;
      {items.length >= maxElement && (
        <p className="bg-secondary-3 px-8px text-sm rounded text-white h-[25px] hover:bg-gray-3">
          <span className="m-0 p-0">...</span>
        </p>
      )}
    </div>
  </Card>
);

export default CardRole;
