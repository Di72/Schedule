/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Layout } from 'antd';
import { ScheduleData } from 'src/types/types';
import { ScheduleContent } from '../ScheduleContent/ScheduleContent';
import ScheduleListMenu from '../ScheduleListMenu/ScheduleListMenu';
import { data } from 'src/api/ScheduleListData';

const { Content, Sider } = Layout;

export const ScheduleList = () => {
  const [content, setContent]: [null | ScheduleData, Function] = useState(null);
  const [currentBlock, setCurrentBlock]: [null | ScheduleData, Function] = useState(null);

  const blocks = data.map(group => {
    const { Blocks, Task, Include, Time } = group;
    return { Blocks, Task, Include, Time };
  });

  function handleClick(block: ScheduleData, primaryBlock: any) {
    setContent(block);
    setCurrentBlock(primaryBlock)
  }

  const header = currentBlock && (
    <div className="header" style={{ textAlign: "center", }}>
      <h1>{currentBlock!.Blocks}</h1>
      <div className="description">
        <span className="description-block" style={{ display: "flex" }}> <b style={{ marginRight: "4px" }}>Task: </b>{currentBlock!.Task}</span>
        <span className="description-block" style={{ display: "flex" }}> <b style={{ marginRight: "4px" }}>Time (Theory + Practice): </b>{currentBlock!.Time}</span>
      </div>
    </div>
  )

  return (
    <Layout style={{ padding: '0 24px', backgroundColor: "transparent" }}>
      <Sider style={{ border: "1px solid #f0f0f0" }}>
        <ScheduleListMenu blocks={blocks} handleClick={handleClick} />
      </Sider>
      <Layout>
        <Content className="schedule_list-content" style={{ whiteSpace: 'pre-wrap', }}>
          {header}
          <ScheduleContent content={content} blocks={blocks} currentBlock={currentBlock && currentBlock!.Blocks} />
        </Content>
      </Layout>
    </Layout>
  );
}