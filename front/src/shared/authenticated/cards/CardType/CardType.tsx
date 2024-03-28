import React from 'react';
import Card from '../Card';
import CardContentType from './CardContentType';

interface CardTypeProps {
  title: string;
  name: string;
  iconVisible?: boolean;
}

// CardType
const CardType: React.FC<CardTypeProps> = ({ title, name, iconVisible = false }) => (
  <Card title={title} iconVisible={iconVisible}>
    <CardContentType name={name} />
  </Card>
);

export default CardType;
