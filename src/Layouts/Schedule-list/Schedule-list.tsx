/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Layout } from 'antd';
import { IInitialState } from 'src/types/types';
import TaskCard from '../TaskCard/TaskCard';

export const ScheduleList = ({ data }: { data: IInitialState }) => {
  const cards = data.events.map((event) => {
    return <TaskCard key={event.id} event={event} />
  })

  return (
    <Layout style={{ padding: '0 24px', backgroundColor: "transparent" }}>
      {cards}
    </Layout>
  );
}