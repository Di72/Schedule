import React from 'react';
import { Form, Input, Select, DatePicker, InputNumber, Button, Row } from 'antd';
import 'antd/dist/antd.css';
import './style.less';

import { modificateDateForPost, uuidv4 } from '../../units';
import { useSelector, useDispatch } from 'react-redux';
import { createEventReduser } from '../../redux/selectors';
import { actions } from '../../redux/events-reducer';

const CreateEventPage = () => {
  const dispatch = useDispatch();
  const isCretingEvent = useSelector(createEventReduser);
  const [form] = Form.useForm();

  const onFinish = (values:any) => {
    const task = values.task;
    const startDate = new Date(task.start.toDate());
    const deadlineDate = new Date(task.deadline.toDate());
 
    if (startDate > deadlineDate) {
     console.log('task ended before start');
    } else {
      console.log({
        ...task,  
        start: modificateDateForPost(startDate),
        deadline: modificateDateForPost(deadlineDate),
        id: uuidv4()
      })
    }
    form.resetFields()
  }

  const onCancel = () => {
    form.resetFields();
    dispatch(actions.createEvent());
  }

  return (
    isCretingEvent ? 
    <div className='createEventPageCoontainer'>
      <Form labelCol={{
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
          rules={[{required: true}]}
        >
          <Input />
        </Form.Item>
        <Form.Item  
          name={['task', 'type']} 
          label="Task type"
          rules={[{required: true}]}
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
          rules={[{required: true,}]}
          name={['task', 'start']}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item 
          label="Deadline" 
          rules={[{required: true,}]}
          name={['task', 'deadline']}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item 
          label="TimeZone" 
          rules={[{required: true,}]}
          name={['task', 'timeZone']}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item 
          label="Place"
          name={['task', 'place']}
          rules={[{required: true,}]}
        >
          <Select>
            <Select.Option value="online">Online</Select.Option>
            <Select.Option value="offline">Offline</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item 
          name={['task', 'description']}
          label='Shot description'
          rules={[{required: true}]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item 
          name={['task', 'descriptionUrl']}
          label='descriptionUrl'
          rules={[{required: true}]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
          name={['task', 'comment']}
          label='Comment'
          rules={[
            {required: true}]}
        >
          <Input.TextArea />
        </Form.Item>
        <Row style={{
            justifyContent: 'center',
          }}>
          <Form.Item 
            wrapperCol={ {span: 16, offset: 8 }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          <Form.Item 
            wrapperCol={ {span: 16, offset: 8 }}
          >
            <Button onClick={()=> form.resetFields()}>Clear</Button>
          </Form.Item>
          <Form.Item 
            wrapperCol={ {span: 16, offset: 8 }}
          >
            <Button onClick={onCancel} danger>Cancel</Button>
          </Form.Item>
        </Row>
      </Form>
    </div>
    : null
  )
}

export default CreateEventPage;