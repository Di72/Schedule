import React from 'react';
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
       







export const Schedule = (): JSX.Element => {
  return (
    <>              
      <Select defaultValue="lucy" style={{ width: 120, margin: 15 }}>
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="Yiminghe">yiminghe</Option>
      </Select>
      <Table dataSource={data} style={{ margin: 15 }}>
        <Column title="Data" dataIndex="firstName" key="firstName" />
        <Column title="Time" dataIndex="lastName" key="lastName" />
        <Column title="Type" dataIndex="age" key="age" />
        <Column title="Place" dataIndex="address" key="address" />
        <Column title="Name" dataIndex="address" key="address" />
        <Column title="Broadcast Url" dataIndex="address" key="address" />
        <Column title="Organizer" dataIndex="address" key="address" />
        <Column title="Details Url" dataIndex="address" key="address" />
        <Column title="Comment" dataIndex="address" key="address" />
        <Column
          title="Tags"
          dataIndex="tags"
          key="tags"
          render={(tags: any) => (
            <>
              {tags.map((tag: any) => (
                <Tag color="blue" key={tag}>
                  {tag}
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
              <a href="/">Invite {record.lastName}</a>
              <a href="/">Delete</a>
            </Space>
          )}
        />
      </Table>
    </>
  );
};
