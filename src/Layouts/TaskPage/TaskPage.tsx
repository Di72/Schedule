import React, { useEffect, useRef, useState } from 'react';
import { EventsType } from "src/types/types"
import { connect } from 'react-redux';
import { AppStateType } from 'src/redux/store';
import { setEventsAndOrganizerSelector } from '../../redux/selectors';
import { renderTags } from '../Tags/Tags';
import { getEvent } from 'src/redux/requests';

function TaskPage({ id, data: { event }, requestEvent }: { id: string, data: { event: null | EventsType }, requestEvent: any }) {
  const [currentTask, setCurrentTask] = useState(event as null | EventsType);
  const prevIdRef = useRef(null) as React.MutableRefObject<null | string>;

  useEffect(() => {
    requestEvent(id);
  }, [id, requestEvent]);

  useEffect(() => {
    if (prevIdRef.current !== id) {
      prevIdRef.current = id;
      setCurrentTask(event);
    }
    return () => {
      prevIdRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event, id])

  useEffect(() => {
    setCurrentTask(null);
  }, [id])

  function getContent(task: EventsType) {
    const { comment, dateTime, description, descriptionUrl, name, place, timeZone, type } = task;
    return (
      <>
        <h3>Name</h3>
        <p>{name}</p>

        <h5>Type</h5>
        <p>{renderTags(type, id)}</p>

        <h5>Datetime</h5>
        <p>{dateTime}</p>

        <h5>Description</h5>
        <p><a href={descriptionUrl}>{description}</a></p>

        <h5>Comment</h5>
        <p>{comment}</p>

        <h5>Place</h5>
        <p>{place}</p>

        <h5>Time zone</h5>
        <p>{timeZone}</p>
      </>
    )
  }

  const content = currentTask ? getContent(currentTask) : (
    <h6>Loading...</h6>
  )
  return (<>{content}</>);
}


const mapStateToProps = (state: AppStateType) => ({ data: setEventsAndOrganizerSelector(state) });

const mapDispatchToProps = { requestEvent: getEvent }

export default connect(mapStateToProps, mapDispatchToProps)(TaskPage);