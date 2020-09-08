import React, { CSSProperties } from 'react';
import { EventsType } from "src/types/types"
import { Card, Tag } from 'antd';

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

  const time = cardTitle(timeZone, 'Time', { fontWeight: "normal" });
  const typeTSX = renderTags(type, id);

  const title = (
    <div style={{ display: "flex", justifyContent: "space-between", }}>
      <span>{name} {typeTSX}</span>
      {time}
    </div>
  );

  const cardRow = (title: string, field: string, link?: string) => {
    const content = link ? <a href={link} target="_blank" rel="noopener noreferrer" >{field}</a> : field
    return (
      <p style={{ display: "flex" }}> <b style={{ marginRight: "4px" }}>{title}:</b> {content}</p>
    )
  }

  const descriptionTSX = description && cardRow('Description', description, descriptionUrl)
  const commentTSX = comment && cardRow('Notate', comment)
  const placeTSX = place && cardRow('Place', place)
  const dateTimeTSX = dateTime && cardRow('Time start', dateTime)

  return (
    <Card className="schedule-list__card" key={id} title={title} style={{ marginBottom: '16px' }} >
      {descriptionTSX}
      {commentTSX}
      {placeTSX}
      {dateTimeTSX}
    </Card>
  )
}