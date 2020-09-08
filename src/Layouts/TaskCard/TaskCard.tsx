import React, { CSSProperties } from 'react';
import { EventsType } from "src/types/types"
import { Card } from 'antd';

export default function TaskCard({ event }: { event: EventsType }) {

  function cardTitle(field: string, title: string, style: CSSProperties) {
    return (field &&
      <span style={style} ><b>{title}:</b> {field}</span>
    )
  }

  const time = cardTitle(event.dateTime, 'Time', { fontWeight: "normal" });

  const title = (
    <div style={{ display: "flex", justifyContent: "space-between", }}>
      <span>{event.name}</span>
      {time}
    </div>
  );
  const description = event.description && <p style={{ display: "flex" }}> <b style={{ marginRight: "4px" }}>Description:</b> {event.description}</p>
  const comment = event.comment &&
    <p style={{ display: "flex" }}> <b style={{ marginRight: "4px" }}>Notate:</b> {event.comment}</p>

  return (
    <Card key={event.id} title={title} >
      {description}
      {comment}
    </Card>
  )
}