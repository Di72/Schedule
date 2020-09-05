import React from 'react';
import { ScheduleData, ScheduleDataSecondary } from "src/types/types"
import { Card } from 'antd';

export default function TaskCard({ content, el }: { content: ScheduleData, el?: ScheduleDataSecondary }) {
  const cardContent = el || content
  const time = cardContent.Time &&
    <span style={{ fontWeight: "normal" }} ><b>Time:</b> {cardContent.Time}</span>
  const title = (
    <div style={{ display: "flex", justifyContent: "space-between", }}>
      <span>{cardContent.Task}</span>
      {time}
    </div>
  );
  const result = cardContent.Result && <p style={{ display: "flex" }}> <b style={{ marginRight: "4px" }}>Result:</b> {cardContent.Result}</p>
  const taskContent = cardContent.Notate &&
    <p style={{ display: "flex" }}> <b style={{ marginRight: "4px" }}>Notate:</b> {cardContent.Notate}</p>



  return (
    <Card key={`${content!.Blocks} ${cardContent.Task}`} title={title} >
      {result}
      {taskContent}
    </Card>)
}