import React, { CSSProperties } from 'react';
import './TaskCard.less';
import { EventsType } from "src/types/types"
import { Card } from 'antd';
import { Link, useRouteMatch } from 'react-router-dom';
import { renderTags } from '../Tags/Tags';


export default function TaskCard({ event }: { event: EventsType }) {
  const { dateTime, id, name, place, timeZone, type, deadline } = event;

  const cardTitle = (field: string, title: string, style: CSSProperties) => {
    return (field &&
      <span style={style} ><b>{title}:</b> {field}</span>
    )
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

  const placeTSX = place && cardRow('Place', place)
  const dateTimeTSX = dateTime && cardRow('Time start', dateTime)
  const deadlineTSX = deadline && cardRow('Deadline', deadline)

  return (
    <Card className="schedule-list__card" key={id} title={title} style={{ marginBottom: '16px' }} >
      {placeTSX}
      {dateTimeTSX}
      {deadlineTSX}
    </Card>
  )
}