import React from 'react';

const CardItemRole: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="border rounded border-secondary-3 text-black-1 text-nowrap text-10px py-4px px-8px mb-1">
      {title}
    </div>
  );
};

export default CardItemRole;
