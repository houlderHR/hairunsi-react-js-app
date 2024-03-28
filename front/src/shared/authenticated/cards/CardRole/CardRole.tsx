import React from 'react';
import Card from '../Card';
import CardContentRole from './CardContentRole';

interface CardTypeProps {
  title: string;
  items: string[];
  iconVisible?: boolean;
}

// CardType
const CardRole: React.FC<CardTypeProps> = ({ title, items, iconVisible = false }) => (
  <Card title={title} iconVisible={iconVisible}>
    <CardContentRole items={items} />
  </Card>
);

export default CardRole;
