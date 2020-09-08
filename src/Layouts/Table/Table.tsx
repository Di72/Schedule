import React, { useEffect } from 'react'
import { Table, Tag, Space, Select } from 'antd';

const { Column } = Table;



const { Option } = Select;


export const Schedule = (props: any) => {

  
  return (<>
    <Select defaultValue="lucy" style={{ width: 120, margin: 15 }} >
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="Yiminghe">yiminghe</Option>
    </Select>
    <Table dataSource={props.data.events}>
      <Table.Column key="dateTime" title="Data" dataIndex="dateTime" />
      <Table.Column key="name" title="Name" dataIndex="name" />
      <Table.Column key="type" title="Type" dataIndex="type"       render={type => (
        <>
          {type.split().map((tag: any) => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      )}/>
      <Table.Column key="timeZone" title="TimeZone" dataIndex="timeZone" />
      <Table.Column key="description" title="Description" dataIndex="description" />
      <Table.Column key="place" title="Place" dataIndex="place" />
    </Table>
  </>)
};
