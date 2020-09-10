import React, { CSSProperties } from 'react';
import './TaskCard.less';
import { EventsType } from "src/types/types"
import { Card, Tag } from 'antd';
import { Link, useRouteMatch } from 'react-router-dom';

export const DUMMY_DATA = {
  description: `
  Курс состоит из нескольких крупных модулей, 
  каждый из которых содержит короткие видео и тесты. 
  Задача тестов - проверить, насколько хорошо стала понятна тема. 
  Тесты можно проходить неограниченное количество раз, более того,
  во многих из них есть пояснения к неправильным ответам.
  Этот курс максимально гибкий: нет дедлайнов, 
  нет возможности "завалить" тест, 
  можно проходить обучение в удобное время в удобном месте.`,
  goal: "Цель курса - ознакомиться с основными технологиями и инструментами, используемыми в инженерной работе.",
  agenda: ['Железо компьютера',
    'Двоичная система счисления',
    'Операционные системы',
    'Типы данных и алгоритмы',
    'Компьютерные сети',
    'Инструменты повышения производительности'],
  teachers: [{
    firstName: 'Ricardo',
    secondName: 'Milos',
    company: 'Hot guys GMBH',
    photo: 'https://24smi.org/public/media/celebrity/2020/03/17/ndyuq11dpxep-rikardo-milos.jpg'
  }],
}

export default function TaskCard({ event }: { event: EventsType }) {
  const { comment, dateTime, description, descriptionUrl, id, name, place, timeZone, type } = event;

  const cardTitle = (field: string, title: string, style: CSSProperties) => {
    return (field &&
      <span style={style} ><b>{title}:</b> {field}</span>
    )
  }

  const renderTags = (type: string, id: string) => {
    const color = type === 'deadline' ? 'red' : 'green';
    return <Tag color={color} key={id}>
      {type}
    </Tag>
  }

  const time = timeZone && cardTitle(timeZone, 'Time', { fontWeight: "normal" });
  const typeTSX = type && renderTags(type, id);
  const match = useRouteMatch();

  const title = (
    <div style={{ display: "flex", justifyContent: "space-between", }}>
      <span>
        <Link to={`${match.url}/${event.id}`} style={{ marginRight: "4px" }} >
          {name}
        </Link>
        {typeTSX}</span>
      {time}
    </div>
  );

  const cardRow = (title: string, field: string, link?: string) => {
    const content = link ? <a href={link} target="_blank" rel="noopener noreferrer" >{field}</a> : field
    return (
      <p style={{ display: "flex" }}> <b style={{ marginRight: "4px" }}>{title}:</b> {content}</p>
    )
  }

  // const descriptionTSX = description && cardRow('Description', description, descriptionUrl)
  // const commentTSX = comment && cardRow('Notate', comment)
  const placeTSX = place && cardRow('Place', place)
  const dateTimeTSX = dateTime && cardRow('Time start', dateTime)

  return (
    <Card className="schedule-list__card" key={id} title={title} style={{ marginBottom: '16px' }} >
      {/* {descriptionTSX} */}
      {/* {commentTSX} */}
      {placeTSX}
      {dateTimeTSX}
    </Card>
  )
}