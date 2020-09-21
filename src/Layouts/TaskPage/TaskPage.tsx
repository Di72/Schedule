import React, { useEffect, useState } from 'react';
import { EventsType, InitialStateType, Itime } from "src/types/types"
import { connect } from 'react-redux';
import { AppStateType } from 'src/redux/store';
import { setEventsAndOrganizerSelector } from '../../redux/selectors';
import { renderTags } from '../Tags/Tags';
import { getEvent } from 'src/redux/requests';
import { Col, Row } from 'antd';
import moment from 'moment';
import { timer } from '../timer/timer';
import { CSSProperties } from 'styled-components';

function TaskPage({ id, data, requestEvent }: { id: string, data: InitialStateType, requestEvent: any }) {
  const { event, timeZone } = data;
  const [currentTask, setCurrentTask] = useState(event as null | EventsType);
  const [timeLeft, setTimeLeft] = useState(null as null | Itime);
  const [startsIn, setStartsIn] = useState(null as null | Itime);
  const [calculating, setCalculating] = useState(true);

  useEffect(() => {
    requestEvent(id);
  }, [id, requestEvent]);

  useEffect(() => {
    setCurrentTask(prevEvent => {
      if (JSON.stringify(prevEvent) !== JSON.stringify(event)) {
        return event
      }
      return prevEvent
    });
  }, [event])

  useEffect(() => {
    let timerResult: { (): void; };
    if (event) {
      const { dateTime, deadline } = event;
      timerResult = timer(timeZone, dateTime, deadline, { setTimeLeft, setStartsIn });
      setTimeout(() => {
        setCalculating(() => false);
      }, 1e3);
    }
    return () => {
      if (event) {
        timerResult();
        setStartsIn(null);
        setTimeLeft(null);
      }
    };
  }, [event, timeZone])

  useEffect(() => {
    setCurrentTask(null);
  }, [id])

  const cardTitle = () => {
    const style: CSSProperties = { fontWeight: "normal" }
    let title = '';
    let dateToEnd = null;
    if (startsIn) {
      dateToEnd = startsIn;
      title = 'Starts in';
    }
    if (timeLeft) {
      dateToEnd = timeLeft;
      title = 'Time left';
    }
    const days = dateToEnd && dateToEnd.days ? `${dateToEnd.days} days, ` : null;
    if (calculating) return <b>Calculating...</b>
    if (event && !dateToEnd) return (<span style={style} ><b>Too late</b></span>)
    return dateToEnd &&
      <span className="show-time" style={style} ><b>{title}:</b> {days}{dateToEnd.hours}:{('00' + dateToEnd.minutes).slice(-2)}</span>
  }

  const getContent = (task: EventsType) => {
    const { comment, dateTime, deadline, description, descriptionUrl, name, place, type } = task;
    const dateTimeTSX = dateTime &&
      <h4>Start task: {moment(+dateTime).tz(timeZone).format('YYYY-MM-DD HH:mm')}</h4>
    const deadlineTSX = deadline &&
      <h4>Deadline: {moment(+deadline).tz(timeZone).format('YYYY-MM-DD HH:mm')}</h4>

    const descriptionTSX = description &&
      <div className="task-page__description">
        <h4>Description:</h4>
        <p><a href={descriptionUrl}>{description}</a></p>
      </div>

    const commentTSX = comment &&
      <div className="task-page__comment">
        <h4>Comment:</h4>
        <p>{comment}</p>
      </div>

    const placeTSX = place &&
      <span className="task-page__place"><b>Place:</b> {place}</span>

    return (
      <Row className="task-page" justify="center">
        <Col sm={{ span: 24 }} md={{ span: 22 }} lg={{ span: 20 }} xl={{ span: 18 }}>
          <header className="task-page__header" >
            <h2>{name} {renderTags(type, id)}</h2>
            {placeTSX}
            {cardTitle()}
          </header>

          <div className="task-page__date">
            {dateTimeTSX}
            {deadlineTSX}
          </div>

          {descriptionTSX}
          {commentTSX}
        </Col>
      </Row>
    )
  }

  const content = currentTask ? getContent(currentTask) : (
    <h6>Loading...</h6>
  )
  return (<>{content}</>);
}


const mapStateToProps = (state: AppStateType) => ({
  data: setEventsAndOrganizerSelector(state)
});

const mapDispatchToProps = { requestEvent: getEvent }

export default connect(mapStateToProps, mapDispatchToProps)(TaskPage);