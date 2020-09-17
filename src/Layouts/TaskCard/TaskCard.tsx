import React, { CSSProperties, useEffect, useState } from 'react';
import './TaskCard.less';
import { EventsType } from "src/types/types"
import { Card } from 'antd';
import { Link, useRouteMatch } from 'react-router-dom';
import { renderTags } from '../Tags/Tags';
import moment from 'moment-timezone';


export default function TaskCard({ event, currentTimeZone }: { event: EventsType, currentTimeZone: string }) {
  const { dateTime, id, name, place, timeZone, type, deadline } = event;
  const [timeLeft, setTimeLeft] = useState(null as null | { [x: string]: number, days: number, hours: number, minutes: number });

  const getTimeLeft = (date: moment.Moment, now: moment.Moment) => {
    const data = {
      days: date.diff(now, 'days'),
      hours: date.diff(now, 'hours') % 24,
      minutes: date.diff(now, 'minutes') % 60
    }

    setTimeLeft(prevData => {
      if (JSON.stringify(prevData) !== JSON.stringify(data)) {
        return { ...data }
      };
      return prevData;
    })
  }

  useEffect(() => {
    if (deadline) {
      const date = moment(+deadline);
      const timer = setInterval(() => {
        const now = moment().tz(currentTimeZone, true);
        const dateTimeStart = moment(+dateTime);
        const showTimeLeft = +dateTimeStart.format('x') < +now.format('x')

        if (date && showTimeLeft) {
          getTimeLeft(date, now);
          if (date.diff(now) < 0) {
            setTimeLeft(null);
            clearInterval(timer);
          }
        }
      }, 1e3)

      return () => {
        clearInterval(timer);
      }
    }
  }, [event, currentTimeZone]);

  const cardTitle = (field: string, title: string, style: CSSProperties) => {
    console.log("cardTitle -> timeLeft", timeLeft)
    return (timeLeft && (timeLeft.hours > 0 && timeLeft.days > 0 && timeLeft.minutes > 0) &&
      <span style={style} ><b>{title}:</b> {timeLeft.days} days, {timeLeft.hours}:{('00' + timeLeft.minutes).slice(-2)}</span>
    )
  }

  const time = deadline && cardTitle(deadline, 'Time left', { fontWeight: "normal" });
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
  const dateTimeTSX = dateTime && cardRow('Time start', moment(+dateTime).format('L HH:MM'))
  const deadlineTSX = deadline && cardRow('Deadline', moment(+deadline).format('L HH:MM'))

  return (
    <Card className="schedule-list__card" key={id} title={title} style={{ marginBottom: '16px' }} >
      {placeTSX}
      {dateTimeTSX}
      {deadlineTSX}
    </Card>
  )
}