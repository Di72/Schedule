import React from 'react';
import { ICourseOverview } from "src/types/types"
import styled from 'styled-components';

const Teacher = styled.div`
display: flex;
justify-content: space-between;
align-items: center;`;

const Photo = styled.img`
max-width: 150px;
height: auto;`;

const ModalContent = (props: ICourseOverview) => {
  return (
    <>
      <h5> Description </h5>
      <p> {props.description} </p>
      
      <h5> Course Goal </h5>
      <p> {props.goal} </p>
      
      <h5> Agenda </h5>
      <ul> 
        { props.agenda.map(theme => {return <li> { theme } </li>}) }
      </ul>
      <h5> Course Team </h5>
      <div>
        {
          props.teachers.map(teacher => {
            return (
              <Teacher>
                <Photo src={teacher.photo}/>
                <div>
                  <p> { teacher.firstName }  {teacher.secondName} </p>
                  <p> { teacher.company } </p>
                </div>
              </Teacher>
            )
          })
        }
        </div>
    </>
  )
}

export default ModalContent