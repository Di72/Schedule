import React from 'react';
import { ScheduleData } from 'src/types/types';
import { Collapse } from 'antd';
import TaskCard from '../TaskCard/TaskCard';

const { Panel } = Collapse;

export function ScheduleContent({ content }: { content: ScheduleData | null }) {
  if (!content) return null;

  function tasks(content: ScheduleData) {
    return content.Include!.map(el => {
      return <TaskCard key={`${content.Blocks} ${el.Task}`} content={content} el={el} />
    })
  }

  function task(content: ScheduleData) {
    return <TaskCard key={`${content.Blocks} ${content.Task}`} content={content} />
  }

  const taskCard = content.Include ? tasks(content) : task(content);

  return (
    <Collapse defaultActiveKey={['1']} >
      <Panel key='1' header={content.Blocks}>
        {taskCard}
      </Panel>
    </Collapse>
  )
}