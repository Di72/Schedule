import React from 'react'
import { Table, Tag } from 'antd';

const { Column } = Table;

export const ScheduleTable = (props: any) => {

  const { events } = props.data;
  const eventsWithKey = events.map((item: { key: any; id: any; }) => {
    item.key = item.id;
    return item;
  });

  const renderTags = (type: string, id: string) => {
    const color = type === 'deadline' ? 'red' : 'green';
    return <Tag color={color} key={id}>
      {type}
    </Tag>
  }

  return (
    <Table dataSource={eventsWithKey}>
      <Column key="dateTime" title="Data" dataIndex="dateTime" />
      <Column key="name" title="Name" dataIndex="name" />
      <Column key="type" title="Type" dataIndex="type" render={(type: string, id: string) => renderTags(type, id)} />
      <Column key="timeZone" title="TimeZone" dataIndex="timeZone" />
      <Column key="description" title="Description" dataIndex="description" />
      <Column key="place" title="Place" dataIndex="place" />
    </Table>
  )
};
