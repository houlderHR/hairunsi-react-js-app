import { FC } from 'react';
import Icon from '../../../Icon';
import Card from '../Card';

interface CardTypeProps {
  title: string;
  name: string;
  iconVisible?: boolean;
}

// CardType
const CardType: FC<CardTypeProps> = ({ title, name, iconVisible = false }) => (
  <Card title={title} iconVisible={iconVisible}>
    <div className="flex mt-4 flex-row justify-start gap-x-4">
      <Icon name="user-guard" height={22} width={18} />
      <p className="text-base">{name}</p>
    </div>
  </Card>
);

export default CardType;
