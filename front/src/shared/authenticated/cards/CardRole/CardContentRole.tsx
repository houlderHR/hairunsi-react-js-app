import React from 'react';
import Icon from '../../../Icon';
import CardItemRole from './CardItemRole';

const maxElement = 11;

const CardContentRole: React.FC<{ items: string[] }> = ({ items }) => {
  return (
    <div className="flex mt-4 gap-x-3 flex-wrap justify-start">
      {items.map((item, index) => {
        if (index < maxElement) return <CardItemRole title={item} />;
      })}
      {items.length >= maxElement && (
        <p className="bg-secondary-3 px-8px text-sm rounded text-white h-[25px]">
          <span className="m-0 p-0">...</span>
        </p>
      )}
    </div>
  );
};

export default CardContentRole;
