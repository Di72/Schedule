import { Button, Col, Row, Switch, Input } from 'antd';
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

function TaskPage({
  id,
  data,
  requestEvent,
  putEvent,
}: {
  id: string;
  data: InitialStateType;
  requestEvent: any;
  putEvent: any;
}) {
  const { event, timeZone } = data;
  const [currentTask, setCurrentTask] = useState(event as null | EventsType);
  const [inputFeedback, setInputFeedback] = useState('');
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
  const disableEditEvent = () => {
    currentTask && putEvent(currentTask, currentTask.id);
  };

  useEffect(() => {
    setCurrentTask(null);
  }, [id]);

  useEffect(() => {
    disableEditEvent();
    setInputFeedback('');
  }, [currentTask?.InputFeedbackEvent, currentTask?.feedback]);

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
    const disableEditEvent = () => {
      currentTask && putEvent(currentTask, currentTask.id);
    };
    const onChangeFeedback = () => {
      currentTask && currentTask.feedback && setCurrentTask({ ...currentTask, feedback: false });
      currentTask && !currentTask.feedback && setCurrentTask({ ...currentTask, feedback: true });
    };
    const onDataNameChangeHandler1 = (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (currentTask) {
        const oldState = { ...currentTask };
        oldState.InputName1 = e.currentTarget.value;
        setCurrentTask(oldState);
      }
    };
    const onDataContentChangeHandler1 = (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (currentTask) {
        const oldState = { ...currentTask };
        oldState.InputContent1 = e.currentTarget.value;
        setCurrentTask(oldState);
      }
    };
    const onDataNameChangeHandler2 = (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (currentTask) {
        const oldState = { ...currentTask };
        oldState.InputName2 = e.currentTarget.value;
        setCurrentTask(oldState);
      }
    };
    const onDataContentChangeHandler2 = (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (currentTask) {
        const oldState = { ...currentTask };
        oldState.InputContent2 = e.currentTarget.value;
        setCurrentTask(oldState);
      }
    };
    const onDataNameChangeHandler3 = (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (currentTask) {
        const oldState = { ...currentTask };
        oldState.InputName3 = e.currentTarget.value;
        setCurrentTask(oldState);
      }
    };
    const onDataContentChangeHandler3 = (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (currentTask) {
        const oldState = { ...currentTask };
        oldState.InputContent3 = e.currentTarget.value;
        setCurrentTask(oldState);
      }
    };
    const onDataNameChangeHandler4 = (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (currentTask) {
        const oldState = { ...currentTask };
        oldState.InputName4 = e.currentTarget.value;
        setCurrentTask(oldState);
      }
    };
    const onDataContentChangeHandler4 = (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (currentTask) {
        const oldState = { ...currentTask };
        oldState.InputContent4 = e.currentTarget.value;
        setCurrentTask(oldState);
      }
    };
    const onDataNameChangeHandler5 = (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (currentTask) {
        const oldState = { ...currentTask };
        oldState.InputName5 = e.currentTarget.value;
        setCurrentTask(oldState);
      }
    };
    const onDataContentChangeHandler5 = (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (currentTask) {
        const oldState = { ...currentTask };
        oldState.InputContent5 = e.currentTarget.value;
        setCurrentTask(oldState);
      }
    };
    const onDataNameChangeHandler6 = (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (currentTask) {
        const oldState = { ...currentTask };
        oldState.InputName6 = e.currentTarget.value;
        setCurrentTask(oldState);
      }
    };
    const onDataContentChangeHandler6 = (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (currentTask) {
        const oldState = { ...currentTask };
        oldState.InputContent6 = e.currentTarget.value;
        setCurrentTask(oldState);
      }
    };
    const onDataNameChangeHandler7 = (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (currentTask) {
        const oldState = { ...currentTask };
        oldState.InputName7 = e.currentTarget.value;
        setCurrentTask(oldState);
      }
    };
    const onDataContentChangeHandler7 = (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (currentTask) {
        const oldState = { ...currentTask };
        oldState.InputContent7 = e.currentTarget.value;
        setCurrentTask(oldState);
      }
    };
    const onDataNameChangeHandler8 = (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (currentTask) {
        const oldState = { ...currentTask };
        oldState.InputName8 = e.currentTarget.value;
        setCurrentTask(oldState);
      }
    };
    const onDataContentChangeHandler8 = (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (currentTask) {
        const oldState = { ...currentTask };
        oldState.InputContent8 = e.currentTarget.value;
        setCurrentTask(oldState);
      }
    };
    const onDataNameChangeHandler9 = (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (currentTask) {
        const oldState = { ...currentTask };
        oldState.InputName9 = e.currentTarget.value;
        setCurrentTask(oldState);
      }
    };
    const onDataContentChangeHandler9 = (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (currentTask) {
        const oldState = { ...currentTask };
        oldState.InputContent9 = e.currentTarget.value;
        setCurrentTask(oldState);
      }
    };
    const onDataNameChangeHandler10 = (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (currentTask) {
        const oldState = { ...currentTask };
        oldState.InputName10 = e.currentTarget.value;
        setCurrentTask(oldState);
      }
    };
    const onDataContentChangeHandler10 = (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (currentTask) {
        const oldState = { ...currentTask };
        oldState.InputContent10 = e.currentTarget.value;
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
    const onDataFeedbackChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
      setInputFeedback(e.currentTarget.value);
    };
    const feedbackSubmit = () => {
      if (currentTask && currentTask.InputFeedbackEvent) {
        setCurrentTask({ ...currentTask, InputFeedbackEvent: [...currentTask.InputFeedbackEvent, inputFeedback] });
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
              {currentTask.feedback && (
                <>
                  <Input
                    onChange={onDataFeedbackChangeHandler}
                    type="text"
                    placeholder="Feedback"
                    value={inputFeedback}
                  />
                  <Button onClick={feedbackSubmit} type="primary">
                    Submit
                  </Button>
                </>
              )}
            </div>
          ) : (
            <>
              <span>Оставлять Feedback:</span>{' '}
              <Switch checked={currentTask.feedback} defaultChecked onChange={onChangeFeedback} />{' '}
            </>
          )}
          {!data.editStatus ? (
            <div>{currentTask?.InputVideo && <ReactPlayer url={currentTask.InputVideo} />}</div>
          ) : (
            <div className="task-page__comment">
              <h3>Адрес видео:</h3>
              <Input
                onChange={onDataVideoChangeHandler}
                type="text"
                value={currentTask.InputVideo}
                onBlur={disableEditEvent}
                onKeyPress={onKeyPress}
              />
            </div>
          )}
          {!data.editStatus ? (
            <div>{currentTask?.InputImg && <img src={currentTask.InputImg} alt="" />}</div>
          ) : (
            <div className="task-page__comment">
              <h3>Адрес картинки:</h3>
              <Input
                onChange={onDataImgChangeHandler}
                type="text"
                value={currentTask.InputImg}
                onBlur={disableEditEvent}
                onKeyPress={onKeyPress}
              />
            </div>
          )}
          {!data.editStatus ? (
            <div>
              {currentTask?.InputName1 && <h1>{currentTask?.InputName1}:</h1>}
              {currentTask?.InputContent1 && <span>{currentTask?.InputContent1}</span>}
              {currentTask?.InputName2 && <h1>{currentTask?.InputName2}:</h1>}
              {currentTask?.InputContent2 && <span>{currentTask?.InputContent2}</span>}
              {currentTask?.InputName3 && <h1>{currentTask?.InputName3}:</h1>}
              {currentTask?.InputContent3 && <span>{currentTask?.InputContent3}</span>}
              {currentTask?.InputName4 && <h1>{currentTask?.InputName4}:</h1>}
              {currentTask?.InputContent4 && <span>{currentTask?.InputContent4}</span>}
              {currentTask?.InputName5 && <h1>{currentTask?.InputName5}:</h1>}
              {currentTask?.InputContent5 && <span>{currentTask?.InputContent5}</span>}
              {currentTask?.InputName6 && <h1>{currentTask?.InputName6}:</h1>}
              {currentTask?.InputContent6 && <span>{currentTask?.InputContent6}</span>}
              {currentTask?.InputName7 && <h1>{currentTask?.InputName7}:</h1>}
              {currentTask?.InputContent7 && <span>{currentTask?.InputContent7}</span>}
              {currentTask?.InputName8 && <h1>{currentTask?.InputName8}:</h1>}
              {currentTask?.InputContent8 && <span>{currentTask?.InputContent8}</span>}
              {currentTask?.InputName9 && <h1>{currentTask?.InputName9}:</h1>}
              {currentTask?.InputContent9 && <span>{currentTask?.InputContent9}</span>}
              {currentTask?.InputName10 && <h1>{currentTask?.InputName10}:</h1>}
              {currentTask?.InputContent10 && <span>{currentTask?.InputContent10}</span>}
            </div>
          ) : (
            <>
              <div className="task-page__comment">
                <h3>1.Имя поля:</h3>
                <Input
                  onChange={onDataNameChangeHandler1}
                  type="text"
                  value={currentTask.InputName1}
                  onBlur={disableEditEvent}
                  onKeyPress={onKeyPress}
                />
                <h3>1.Содержимое поля:</h3>
                <Input
                  onChange={onDataContentChangeHandler1}
                  value={currentTask.InputContent1}
                  type="text"
                  onBlur={disableEditEvent}
                  onKeyPress={onKeyPress}
                />
              </div>
              <div className="task-page__comment">
                <h3>2.Имя поля:</h3>
                <Input
                  onChange={onDataNameChangeHandler2}
                  type="text"
                  value={currentTask.InputName2}
                  onBlur={disableEditEvent}
                  onKeyPress={onKeyPress}
                />
                <h3>2.Содержимое поля:</h3>
                <Input
                  onChange={onDataContentChangeHandler2}
                  value={currentTask.InputContent2}
                  type="text"
                  onBlur={disableEditEvent}
                  onKeyPress={onKeyPress}
                />
              </div>
              <div className="task-page__comment">
                <h3>3.Имя поля:</h3>
                <Input
                  onChange={onDataNameChangeHandler3}
                  type="text"
                  value={currentTask.InputName3}
                  onBlur={disableEditEvent}
                  onKeyPress={onKeyPress}
                />
                <h3>3.Содержимое поля:</h3>
                <Input
                  onChange={onDataContentChangeHandler3}
                  value={currentTask.InputContent3}
                  type="text"
                  onBlur={disableEditEvent}
                  onKeyPress={onKeyPress}
                />
              </div>
              <div className="task-page__comment">
                <h3>4.Имя поля:</h3>
                <Input
                  onChange={onDataNameChangeHandler4}
                  type="text"
                  value={currentTask.InputName4}
                  onBlur={disableEditEvent}
                  onKeyPress={onKeyPress}
                />
                <h3>4.Содержимое поля:</h3>
                <Input
                  onChange={onDataContentChangeHandler4}
                  value={currentTask.InputContent4}
                  type="text"
                  onBlur={disableEditEvent}
                  onKeyPress={onKeyPress}
                />
              </div>
              <div className="task-page__comment">
                <h3>5.Имя поля:</h3>
                <Input
                  onChange={onDataNameChangeHandler5}
                  type="text"
                  value={currentTask.InputName5}
                  onBlur={disableEditEvent}
                  onKeyPress={onKeyPress}
                />
                <h3>5.Содержимое поля:</h3>
                <Input
                  onChange={onDataContentChangeHandler5}
                  value={currentTask.InputContent5}
                  type="text"
                  onBlur={disableEditEvent}
                  onKeyPress={onKeyPress}
                />
              </div>
              <div className="task-page__comment">
                <h3>6.Имя поля:</h3>
                <Input
                  onChange={onDataNameChangeHandler6}
                  type="text"
                  value={currentTask.InputName6}
                  onBlur={disableEditEvent}
                  onKeyPress={onKeyPress}
                />
                <h3>6.Содержимое поля:</h3>
                <Input
                  onChange={onDataContentChangeHandler6}
                  value={currentTask.InputContent6}
                  type="text"
                  onBlur={disableEditEvent}
                  onKeyPress={onKeyPress}
                />
              </div>
              <div className="task-page__comment">
                <h3>7.Имя поля:</h3>
                <Input
                  onChange={onDataNameChangeHandler7}
                  type="text"
                  value={currentTask.InputName7}
                  onBlur={disableEditEvent}
                  onKeyPress={onKeyPress}
                />
                <h3>7.Содержимое поля:</h3>
                <Input
                  onChange={onDataContentChangeHandler7}
                  value={currentTask.InputContent7}
                  type="text"
                  onBlur={disableEditEvent}
                  onKeyPress={onKeyPress}
                />
              </div>
              <div className="task-page__comment">
                <h3>8.Имя поля:</h3>
                <Input
                  onChange={onDataNameChangeHandler8}
                  type="text"
                  value={currentTask.InputName8}
                  onBlur={disableEditEvent}
                  onKeyPress={onKeyPress}
                />
                <h3>8.Содержимое поля:</h3>
                <Input
                  onChange={onDataContentChangeHandler8}
                  value={currentTask.InputContent8}
                  type="text"
                  onBlur={disableEditEvent}
                  onKeyPress={onKeyPress}
                />
              </div>
              <div className="task-page__comment">
                <h3>9.Имя поля:</h3>
                <Input
                  onChange={onDataNameChangeHandler9}
                  type="text"
                  value={currentTask.InputName9}
                  onBlur={disableEditEvent}
                  onKeyPress={onKeyPress}
                />
                <h3>9.Содержимое поля:</h3>
                <Input
                  onChange={onDataContentChangeHandler9}
                  value={currentTask.InputContent9}
                  type="text"
                  onBlur={disableEditEvent}
                  onKeyPress={onKeyPress}
                />
              </div>
              <div className="task-page__comment">
                <h3>10.Имя поля:</h3>
                <Input
                  onChange={onDataNameChangeHandler10}
                  type="text"
                  value={currentTask.InputName10}
                  onBlur={disableEditEvent}
                  onKeyPress={onKeyPress}
                />
                <h3>10.Содержимое поля:</h3>
                <Input
                  onChange={onDataContentChangeHandler10}
                  value={currentTask.InputContent10}
                  type="text"
                  onBlur={disableEditEvent}
                  onKeyPress={onKeyPress}
                />
              </div>
            </>
          )}
          {!data.editStatus ? (
            currentTask.InputFeedbackEvent &&
            currentTask.InputFeedbackEvent.map((item: string) => {
              return (
                <div>
                  <br />
                  <span>{item}</span>
                  <br />
                </div>
              );
            })
          ) : (
            <div></div>
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
