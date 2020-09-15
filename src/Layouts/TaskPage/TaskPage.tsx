import React, { useEffect, useState } from 'react';
import { ITaskPage } from "src/types/types"
import styled from 'styled-components';
import { connect } from 'react-redux';
import { AppStateType } from 'src/redux/store';
import { setEventsAndOrganizerSelector } from '../../redux/selectors';
import { getEvent } from 'src/redux/requests';

const Teacher = styled.div`
display: flex;
justify-content: space-between;
align-items: center;`;

const Photo = styled.img`
max-width: 150px;
height: auto;`;

function TaskPage(props: ITaskPage) {
  const [currentTask, setCurrentTask] = useState(null as null | ITaskPage);
  useEffect(() => {
    const { id } = props;
    props.requestEvent(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setCurrentTask(props);
  }, [props.id])

  useEffect(() => {
    console.log(currentTask)
  }, [currentTask]);

  const list = currentTask && currentTask.agenda.map(theme => { return <li key={theme}> {theme} </li> })
  const content = currentTask ? (
    <>
      <h5> Description </h5>
      <p> {currentTask.description} </p>

      <h5> Course Goal </h5>
      <p> {currentTask.goal} </p>

      <h5> Agenda </h5>
      <ul>
        {list}
      </ul>
      <h5> Course Team </h5>
      <div>
        {
          currentTask.teachers.map(teacher => {
            return (
              <Teacher key={`${teacher.firstName} ${teacher.secondName}`} >
                <Photo src={teacher.photo} />
                <div>
                  <p> {teacher.firstName}  {teacher.secondName} </p>
                  <p> {teacher.company} </p>
                </div>
              </Teacher>
            )
          })
        }
      </div>
    </>
  ) : (
      <h6>Loading...</h6>
    )

  return (<>{content}</>);
}


const mapStateToProps = (state: AppStateType) => {
  return {
    data: setEventsAndOrganizerSelector(state)
  };
};

export default connect(mapStateToProps, { requestEvent: getEvent })(TaskPage);