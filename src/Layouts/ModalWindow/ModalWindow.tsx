import React from 'react';
import { ICourseOverview } from "../../types/types";
import { Modal } from 'antd';
import styled from 'styled-components';

const Teacher = styled.div`
display: flex;
justify-content: space-between;
align-items: center;`;

const Photo = styled.img`
max-width: 150px;
height: auto;`;

interface ModalProps {
  data: ICourseOverview;
  okClickHandler: (event: React.MouseEvent<HTMLElement>) => void;
  cancelClickHandler: (event: React.MouseEvent<HTMLElement>) => void;
  visible: boolean;
}

const ModalWindow = (props: ModalProps) => {
  const { okClickHandler, cancelClickHandler, visible } = props;
  const { description, goal, agenda, teachers } = props.data;

  return (
    <Modal onOk={okClickHandler} onCancel={cancelClickHandler} visible={visible}>
      <h5> Description </h5>
      <p> {description} </p>

      <h5> Course Goal </h5>
      <p> {goal} </p>

      <h5> Agenda </h5>
      <ul>
        {agenda.map(theme => { return <li> {theme} </li> })}
      </ul>
      <h5> Course Team </h5>
      <div>
        {
          teachers.map(teacher => {
            return (
              <Teacher>
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
    </Modal>
  )
}

export default ModalWindow;