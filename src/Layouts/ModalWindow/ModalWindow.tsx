import { Modal } from 'antd';
import React from 'react';
import { IModalProps } from 'src/types/types';
import styled from 'styled-components';

const Teacher = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Photo = styled.img`
  max-width: 150px;
  height: auto;
`;

const ModalWindow = (props: IModalProps): JSX.Element => {
  const { okClickHandler, cancelClickHandler, visible, data } = props;
  const { description, goal, agenda, teachers } = data;

  return (
    <Modal onOk={okClickHandler} onCancel={cancelClickHandler} visible={visible}>
      <h5> Description </h5>
      <p> {description} </p>

      <h5> Course Goal </h5>
      <p> {goal} </p>

      <h5> Agenda </h5>
      <ul>
        {agenda.map((theme) => {
          return <li key={theme}> {theme} </li>;
        })}
      </ul>
      <h5> Course Team </h5>
      <div>
        {teachers.map((teacher) => {
          const { firstName, secondName } = teacher;
          const fullName = `${firstName} ${secondName}`;
          return (
            <Teacher key={fullName}>
              <Photo src={teacher.photo} />
              <div>
                <p>
                  {' '}
                  {teacher.firstName} {teacher.secondName}{' '}
                </p>
                <p> {teacher.company} </p>
              </div>
            </Teacher>
          );
        })}
      </div>
    </Modal>
  );
};

export default ModalWindow;
