import React from 'react';
import { Table, Tag } from 'antd';
import moment from 'moment-timezone';
import './ScheduleTable.less';

const { Column } = Table;

export const ScheduleTable = (props: any) => {
  const { events } = props.data;
  
  const eventsWithKey = events.map((item: { key: any; id: any }) => {
    item.key = item.id;
    return item;
  });

  const eventsWithFormattedTime = eventsWithKey.map((item: any) => {
    item.time = new Date();
    item.time.setHours(0, 0, 0, 0);
    return item;
  });

  const renderTags = (type: string, id: string) => {
    const color = type === 'deadline' ? 'red' : 'green';
    return (
      <Tag color={color} key={id}>
        {type}
      </Tag>
    );
  };

  // const mockEvent = [{
  //   comment: "Установить Git. Создать github-аккаунт",
  //   dateTime: "12/11/20",
  //   time: new Date(),
  //   deadline: "12/12/20",
  //   description: "Регистрация на Гитхабе",
  //   descriptionUrl: "https://htmlacademy.ru/blog/boost/tools/register-on-github-work-with-console",
  //   id: "M3gTaSE0GGVrSZmQGabQ",
  //   key: "M3gTaSE0GGVrSZmQGabQ",
  //   name: "Git & GitHub",
  //   place: "online",
  //   timeZone: "8h",
  //   type: "git task",
  // }];

  // const dateRenderer = (timeZone: string) => (value: string) =>
  //   value
  //     ? moment(value, 'YYYY-MM-DD HH:mmZ')
  //       .tz(timeZone)
  //       .format('YYYY-MM-DD')
  //     : '';

  const timeRenderer = (timeZone: string) => (value: string) => {
    // console.log('timeZone: ', timeZone, '\nvalue:', value);
    return value
      ? moment(value, 'YYYY-MM-DD HH:mmZ')
        .tz(timeZone)
        .format('HH:mm')
      : '';
  }

  return (
    <Table dataSource={eventsWithFormattedTime} >
      <Column
        key="dateTime"
        title="Data"
        dataIndex="dateTime"
        width="110px" />
      <Column
        key="time"
        title="Time"
        dataIndex="time"
        width="70px"
        render={timeRenderer(props.data.timeZone)} />
      <Column key="name" title="Name" dataIndex="name" />
      <Column
        key="type"
        title="Type"
        dataIndex="type"
        width="150px"
        render={(type: string, id: string) => renderTags(type, id)}
      />
      <Column key="timeZone" title="Duration" dataIndex="timeZone" width="110px" />
      <Column key="description" title="Description" dataIndex="description" />
      <Column key="place" title="Place" dataIndex="place" width="110px" />
    </Table>
  );
};
