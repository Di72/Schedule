import React, { useEffect } from 'react'
import { Table, Tag, Space, Select } from 'antd';

const { Column } = Table;

const data = [
  {
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];


const { Option } = Select;


export const Schedule = (props: any) => {
  useEffect(() => {
    props.requestOrganizers();
    props.requestEvents()
  }, [])

  return (<>
    <Select defaultValue="lucy" style={{ width: 120, margin: 15 }} >
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="Yiminghe">yiminghe</Option>
    </Select>
    <Table dataSource={props.data.events} style={{ margin: 15 }}>
      <Column title="Data" dataIndex={props.data.events.type} key={props.data.events.type} />
      <Column title="Time" dataIndex={props.data.events.type} key={props.data.events.type} />
      <Column title="Type" dataIndex={props.data.events.type} key={props.data.events.type} />
      <Column title="Place" dataIndex={props.data.events.type} key={props.data.events.type} />
      <Column title="Name" dataIndex={props.data.events.type} key={props.data.events.type} />
      <Column title="Broadcast Url" dataIndex={props.data.events.type} key={props.data.events.type} />
      <Column title="Organizer" dataIndex={props.data.events.type} key={props.data.events.type} />
      <Column title="Details Url" dataIndex={props.data.events.type} key={props.data.events.type} />
      <Column title="Comment" dataIndex={props.data.events.type} key={props.data.events.type} />
      <Column
        title="Tags"
        dataIndex="tags"
        key="tags"
        render={(tags: any) => (
          <>
            {props.data.events.type.split.map((tag: any) => (
              <Tag color="blue" key={props.data.events.type}>
                {props.data.events.type}
              </Tag>
            ))}
          </>
        )}
      />
      <Column
        title="Action"
        key="action"
        render={(text: any, record: any) => (
          <Space size="middle">
            <a href='/'>Invite {record.lastName}</a>
            <a href='/'>Delete</a>
          </Space>
        )}
      />
    </Table>
  </>)
};
