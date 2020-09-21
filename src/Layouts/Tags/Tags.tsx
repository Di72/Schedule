import { Tag } from 'antd';
import React from 'react';

export const renderTags = (type: string, id: string) => {
  const color = type === 'deadline' ? 'red' : 'green';
  return (
    <Tag color={color} key={id}>
      {type}
    </Tag>
  );
};
