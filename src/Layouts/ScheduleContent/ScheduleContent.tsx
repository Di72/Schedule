import React from 'react';
import { ScheduleData, ScheduleDataSecondary } from 'src/types/types';
import { Collapse } from 'antd';
import TaskCard from '../TaskCard/TaskCard';

const { Panel } = Collapse;

export function ScheduleContent({ content, blocks, currentBlock }: {
  content: ScheduleData | null,
  blocks: {
    Blocks: string | undefined;
    Task: string;
    Include: ScheduleDataSecondary[] | undefined;
    Time: string | undefined;
  }[],
  currentBlock: any
}) {
  if (!content) return null;

  function tasks(content: ScheduleDataSecondary) {
    return content.Include!.map(el => {
      const key = `${content.Blocks} ${el.Task}`;
      return <TaskCard key={key} content={content} el={el} />
    })
  }

  function task(content: ScheduleDataSecondary) {
    const key = `${content.Blocks} ${content.Task}`;
    return <TaskCard key={key} content={content} />
  }

  const taskCard = (content: ScheduleDataSecondary) => content.Include ? tasks(content) : task(content);
  const filetBlocks = blocks.filter(item => item.Blocks === currentBlock);

  const panels = filetBlocks[0].Include!.map((item, index) => {
    const key = `${filetBlocks[0].Blocks} ${item.Blocks!} ${index}`;

    return (
      <Panel key={key} header={item.Blocks}>
        {taskCard(item)}
      </Panel>
    )
  })

  return (
    <Collapse>
      {panels}
    </Collapse>
  )
}