import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Button,
  Row,
  Collapse,
} from 'antd';
import 'antd/dist/antd.css';
import './style.less';

import { postEvent } from '../../redux/requests';
import { AppStateType } from '../../redux/store';
import { modificationDateForPost } from '../../units';
import { isNewTaskPostedSelector } from '../../redux/selectors';

const CreateEventPage = (props: any) => {
  const [openedPanel, setOpenedPanel] = useState('');
  const [form] = Form.useForm();
  const { Panel } = Collapse;

  const onFinish = (values: any) => {
    const task = values.task;
    const startDate = new Date(task.dateTime.toDate());
    const deadlineDate = new Date(task.deadline.toDate());
    const timeZone = task.timeZone.toString();

    if (startDate > deadlineDate) {
      console.log('task ended before start');
    } else {
      props.postEvent({
        ...task,
        dateTime: modificationDateForPost(startDate),
        deadline: modificationDateForPost(deadlineDate),
        timeZone,
      })
    }
    form.resetFields()
  }

  const onCancel = () => {
    if (openedPanel) setOpenedPanel('');
    else setOpenedPanel('1');
    form.resetFields();
  }

  return (
    <Collapse
      activeKey={openedPanel}
      className='createEventPageContainer'
      accordion={true}
      onChange={onCancel}
    >
      <Panel
        header="Create Event" key="1"
        style={{ textAlign: 'center' }}
        showArrow={false}
      >
        <Form
          className='createEventForm'
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          initialValues={{
            size: 'default',
          }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            name={['task', 'name']}
            label='Task name'
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['task', 'type']}
            label="Task type"
            rules={[{ required: true }]}
          >
            <Select>
              <Select.Option value="Js Task">Js Task</Select.Option>
              <Select.Option value="basic task">Basic task</Select.Option>
              <Select.Option value="html/css task">html/css task</Select.Option>
              <Select.Option value="git task">git task</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Start task"
            rules={[{ required: true, }]}
            name={['task', 'dateTime']}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Deadline"
            rules={[{ required: true, }]}
            name={['task', 'deadline']}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="TimeZone"
            rules={[{ required: true, }]}
            name={['task', 'timeZone']}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Place"
            name={['task', 'place']}
            rules={[{ required: true, }]}
          >
            <Select>
              <Select.Option value="online">Online</Select.Option>
              <Select.Option value="offline">Offline</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name={['task', 'description']}
            label='Short description'
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name={['task', 'descriptionUrl']}
            label='descriptionUrl'
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['task', 'comment']}
            label='Comment'
            rules={[
              { required: true }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Row className='row'>
            <div className='btn-container'>
              <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                  Submit
              </Button>
              </Form.Item>
              <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
                <Button >Preview</Button>
              </Form.Item>
            </div>
            <div className='btn-container'>
              <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
                <Button onClick={() => form.resetFields()} danger>Clear</Button>
              </Form.Item>
              <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
                <Button type="primary" onClick={onCancel} danger>Cancel</Button>
              </Form.Item>
            </div>
          </Row>
        </Form>
      </Panel>
    </Collapse>
  )
}

const mapStateToProps = (state: AppStateType) => {
  return {
    data: isNewTaskPostedSelector(state)
  };
};

export default connect(mapStateToProps, { postEvent: postEvent })(CreateEventPage);