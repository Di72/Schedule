import { Tag } from 'antd';
import React from 'react';

function ScheduleTags({ typeTask, tagKey }: { typeTask: string; tagKey?: string }): JSX.Element {
  let color = '';
  switch (typeTask) {
    case 'deadline':
      color = '#d4380d';
      break;
    case 'basic task':
      color = '#52c41a';
      break;
    case 'html/css task':
      color = '#13c2c2';
      break;
    case 'js task':
      color = '#1890ff';
      break;
    case 'git task':
      color = '#722ed1';
      break;
    default:
      color = 'uuuu';
      break;
  }

  return (
    <Tag color={color} key={tagKey}>
      {typeTask}
    </Tag>
  );
}

ScheduleTags.defaultProps = {
  tagKey: '1',
};

export { ScheduleTags };
