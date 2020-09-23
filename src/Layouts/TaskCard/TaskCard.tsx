import { Card } from 'antd';
import moment from 'moment-timezone';
import React, { CSSProperties, useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { ITaskCardProps, ITime } from 'src/types/types';
import { ScheduleTags } from '../Tags/Tags';
import { timer } from '../timer/timer';
import './TaskCard.less';

export const TaskCard = ({ event, currentTimeZone }: ITaskCardProps): JSX.Element => {
  const { dateTime, id, name, place, type, deadline } = event;
  const [timeLeft, setTimeLeft] = useState(null as null | ITime);
  const [startsIn, setStartsIn] = useState(null as null | ITime);
  const [calculating, setCalculating] = useState(true);

  useEffect(() => {
    let timerResult: { (): void };

    if (event) {
      timerResult = timer(currentTimeZone, dateTime, deadline, { setStartsIn, setTimeLeft });
      setTimeout(() => {
        setCalculating((prevState) => prevState && false);
      }, 1e3);
    }
    return () => {
      if (event) {
        timerResult();
      }
    };
  }, [event, currentTimeZone, deadline, dateTime]);

  const cardTitle = () => {
    const style: CSSProperties = { fontWeight: 'normal' };
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

    if (calculating) return <b>Calculating...</b>;
    if (!dateToEnd)
      return (
        <span className="too-late" style={style}>
          <b>Too late</b>
        </span>
      );

    return (
      dateToEnd && (
        <span className="show-time" style={style}>
          <b>{title}:</b> {days}
          {dateToEnd.hours}:{`00${dateToEnd.minutes}`.slice(-2)}
        </span>
      )
    );
  };

  const time = cardTitle();
  const typeTSX = type && <ScheduleTags typeTask={type} key={id} />;
  const match = useRouteMatch();

  const title = (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span>
        <Link to={`${match.url}/${event.id}`} style={{ marginRight: '4px' }}>
          {name}
        </Link>
        {typeTSX}
      </span>
      {time}
    </div>
  );

  const cardRow = (titleText: string, field: string, link?: string) => {
    const content = link ? (
      <a href={link} target="_blank" rel="noopener noreferrer">
        {field}
      </a>
    ) : (
      field
    );
    return (
      <p style={{ display: 'flex' }}>
        {' '}
        <b style={{ marginRight: '4px' }}>{titleText}:</b> {content}
      </p>
    );
  };

  const placeTSX = place && cardRow('Place', place);
  const dateTimeTSX =
    dateTime &&
    cardRow(
      'Time start',
      moment(+dateTime)
        .tz(currentTimeZone)
        .format('YYYY-MM-DD HH:mm')
    );
  const deadlineTSX =
    deadline &&
    cardRow(
      'Deadline',
      moment(+deadline)
        .tz(currentTimeZone)
        .format('YYYY-MM-DD HH:mm')
    );

  return (
    <Card className="schedule-list__card" key={id} title={title}>
      {placeTSX}
      {dateTimeTSX}
      {deadlineTSX}
    </Card>
  );
};
