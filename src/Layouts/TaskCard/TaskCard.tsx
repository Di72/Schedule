import React, { CSSProperties, useEffect, useState } from 'react';
import './TaskCard.less';
import { EventsType, Itime } from "src/types/types"
import { Card } from 'antd';
import { Link, useRouteMatch } from 'react-router-dom';
import { renderTags } from '../Tags/Tags';
import moment from 'moment-timezone';
import { timer } from '../timer/timer';

export const TaskCard = ({ event, currentTimeZone }: { event: EventsType, currentTimeZone: string }) => {
  const { dateTime, id, name, place, type, deadline } = event;
  const [timeLeft, setTimeLeft] = useState(null as null | Itime);
  const [startsIn, setStartsIn] = useState(null as null | Itime);

  useEffect(() => {
    timer(currentTimeZone, dateTime, deadline, { setStartsIn, setTimeLeft })
  }, [event, currentTimeZone, deadline, dateTime]);

  const cardTitle = () => {
    const style: CSSProperties = { fontWeight: "normal" }
    let title = '';
    let dateToEnd = null;
    if (timeLeft) {
      dateToEnd = timeLeft;
      title = 'Time left';
    }
    if (startsIn) {
      dateToEnd = startsIn;
      title = 'Starts in';
    }
    const days = dateToEnd && dateToEnd.days ? `${dateToEnd.days} days, ` : null;
    if (!dateToEnd) return <span style={style} ><b>Too late</b></span>;

    return dateToEnd &&
      <span style={style} ><b>{title}:</b> {days}{dateToEnd.hours}:{('00' + dateToEnd.minutes).slice(-2)}</span>
  }

  const time = cardTitle();
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
  const dateTimeTSX = dateTime && cardRow('Time start', moment(+dateTime).tz(currentTimeZone).format('YYYY-MM-DD HH:mm'))
  const deadlineTSX = deadline && cardRow('Deadline', moment(+deadline).tz(currentTimeZone).format('YYYY-MM-DD HH:mm'))

  return (
    <Card className="schedule-list__card" key={id} title={title} style={{ marginBottom: '16px' }} >
      {placeTSX}
      {dateTimeTSX}
      {deadlineTSX}
    </Card>
  )
}