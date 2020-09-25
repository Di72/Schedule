import { Col, Row } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { getEvent } from 'src/redux/requests';
import { AppStateType } from 'src/redux/store';
import { EventsType, InitialStateType, ITime } from 'src/types/types';
import { CSSProperties } from 'styled-components';
import { setEventsAndOrganizerSelector } from '../../redux/selectors';
import Spinner from '../Spinner/Spinner';
import { ScheduleTags } from '../Tags/Tags';
import { timer } from '../timer/timer';
import { putEvent } from '../../redux/requests';

function TaskPage({ id, data, requestEvent, putEvent }: { id: string; data: InitialStateType; requestEvent: any, putEvent: any }) {
  const { event, timeZone } = data;
  const [currentTask, setCurrentTask] = useState(event as null | EventsType);
  const [timeLeft, setTimeLeft] = useState(null as null | ITime);
  const [startsIn, setStartsIn] = useState(null as null | ITime);
  const [calculating, setCalculating] = useState(true);

  useEffect(() => {
    requestEvent(id);
  }, [id, requestEvent]);

  useEffect(() => {
    setCurrentTask((prevEvent) => {
      if (JSON.stringify(prevEvent) !== JSON.stringify(event)) {
        return event;
      }
      return prevEvent;
    });
  }, [event]);

  useEffect(() => {
    let timerResult: { (): void };
    if (event) {
      const { dateTime, deadline } = event;
      timerResult = timer(timeZone, dateTime, deadline, { setTimeLeft, setStartsIn });
      setTimeout(() => {
        setCalculating((prevState) => prevState && !prevState);
      }, 1e3);
    }
    return () => {
      if (event) {
        timerResult();
        setStartsIn(null);
        setTimeLeft(null);
      }
    };
  }, [event, timeZone]);

  useEffect(() => {
    setCurrentTask(null);
  }, [id]);

  const cardTitle = () => {
    const style: CSSProperties = { fontWeight: 'normal' };
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
    if (calculating) return <b>Calculating...</b>;
    if (event && !dateToEnd)
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

  const getContent = (task: EventsType) => {
    const { comment, dateTime, deadline, description, descriptionUrl, name, place, type } = task;
    const dateTimeTSX = dateTime && (
      <h4>
        Start task:{' '}
        {moment(+dateTime)
          .tz(timeZone)
          .format('YYYY-MM-DD HH:mm')}
      </h4>
    );
    const deadlineTSX = deadline && (
      <h4>
        Deadline:{' '}
        {moment(+deadline)
          .tz(timeZone)
          .format('YYYY-MM-DD HH:mm')}
      </h4>
    );
    const inputCSS: CSSProperties = {
      border: 'none',
      boxShadow: `${!data.editStatus ? 'none' : '0px 0px 3px 3px lightblue'}`,
      padding: 0,
      backgroundColor: 'transparent',
      width: '100%',
      boxSizing: 'border-box',
    };
    const disableEditEvent = () => {
      currentTask && putEvent(currentTask, currentTask.id);
    };
    const onDataNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (currentTask) {
        const oldState = { ...currentTask };
        oldState.InputName = e.currentTarget.value;
        setCurrentTask(oldState);
      }
    };
    const onDataContentChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (currentTask) {
        const oldState = { ...currentTask };
        oldState.InputContent = e.currentTarget.value;
        setCurrentTask(oldState);
      }
    };
    const onDataImgChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (currentTask) {
        const oldState = { ...currentTask };
        oldState.InputImg = e.currentTarget.value;
        setCurrentTask(oldState);
      }
    };
    const onDataVideoChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (currentTask) {
        const oldState = { ...currentTask };
        oldState.InputVideo = e.currentTarget.value;
        setCurrentTask(oldState);
      }
    };
    const onKeyPress = (k: React.KeyboardEvent<HTMLInputElement>): void => {
      if (k.key === 'Enter') {
        const currentEl = k.target as HTMLElement;
        disableEditEvent();
        currentEl.blur();
      }
    };

    const descriptionTSX = description && (
      <div className="task-page__description">
        <h4>Description:</h4>
        <p>
          <a href={descriptionUrl}>{description}</a>
        </p>
      </div>
    );

    const commentTSX = comment && (
      <div className="task-page__comment">
        <h4>Comment:</h4>
        <p>{comment}</p>
      </div>
    );

    const placeTSX = place && (
      <span className="task-page__place">
        <b>Place:</b> {place}
      </span>
    );

    return currentTask ? (
      <Row className="task-page" justify="center">
        <Col sm={{ span: 24 }} md={{ span: 22 }} lg={{ span: 20 }} xl={{ span: 18 }}>
          <header className="task-page__header">
            <h2>
              {name} <ScheduleTags typeTask={type} key={id} />
            </h2>
            {placeTSX}
            {cardTitle()}
          </header>

          <div className="task-page__date">
            {dateTimeTSX}
            {deadlineTSX}
          </div>

          {descriptionTSX}
          {commentTSX}
          {!data.editStatus ? (
            <div>
              {currentTask?.InputVideo && <ReactPlayer url={currentTask.InputVideo} />}
            </div>
          ) : (
            <div className="task-page__comment">
              <h3>Адрес видео:</h3>
              <input
                onChange={onDataVideoChangeHandler}
                style={inputCSS}
                type="text"
                value={currentTask.InputVideo}
                onBlur={disableEditEvent}
                onKeyPress={onKeyPress}
              />
            </div>
          )}
          {!data.editStatus ? (
            <div>
              {currentTask?.InputImg && <img src={currentTask.InputImg} alt=''/>}
            </div>
          ) : (
            <div className="task-page__comment">
              <h3>Адрес картинки:</h3>
              <input
                onChange={onDataImgChangeHandler}
                style={inputCSS}
                type="text"
                value={currentTask.InputImg}
                onBlur={disableEditEvent}
                onKeyPress={onKeyPress}
              />
            </div>
          )}
          {!data.editStatus ? (
            <div>
              {currentTask?.InputName && <h1>{currentTask?.InputName}:</h1>}
              <br />
              {currentTask?.InputContent && <span>{currentTask?.InputContent}</span>}
            </div>
          ) : (
            <div className="task-page__comment">
              <h3>Имя поля:</h3>
              <input
                onChange={onDataNameChangeHandler}
                style={inputCSS}
                type="text"
                value={currentTask.InputName}
                onBlur={disableEditEvent}
                onKeyPress={onKeyPress}
              />
              <h3>Содержимое поля:</h3>
              <input
                onChange={onDataContentChangeHandler}
                style={inputCSS}
                value={currentTask.InputContent}
                type="text"
                onBlur={disableEditEvent}
                onKeyPress={onKeyPress}
              />
            </div>
          )}
        </Col>
      </Row>
    ) : (
      <Spinner />
    );
  };

  const content = currentTask ? getContent(currentTask) : <Spinner />;
  return <>{content}</>;
}

const mapStateToProps = (state: AppStateType) => ({
  data: setEventsAndOrganizerSelector(state),
});

const mapDispatchToProps = { requestEvent: getEvent, putEvent };

export default connect(mapStateToProps, mapDispatchToProps)(TaskPage);
