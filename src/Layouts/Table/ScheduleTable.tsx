import React, { useState, useEffect } from 'react';
import { Table, Tag } from 'antd';
import { EventsType } from '../../types/types';

const { Column } = Table;


export const ScheduleTable = (props: any) => {

	const [ editMode, setEditMode ] = useState({ editMode: false });
  const [ currentTask, setCurrentTask ] = useState(null as null | EventsType[] );
  

  const [event, setEvent] = useState(currentTask && currentTask[0].name);


	useEffect(
		() => {
			// eslint-disable-next-line react-hooks/exhaustive-deps
      setCurrentTask(props.data.events);
      if(currentTask) setEvent(currentTask[0].name)
		},
		[props.data.events]
	);

	const { events } = props.data;
	const eventsWithKey = events.map((item: { key: any; id: any }) => {
		item.key = item.id;
		return item;
	});

	const renderTags = (type: string, id: string) => {
		const color = type === 'deadline' ? 'red' : 'green';
		return (
			<Tag color={color} key={id}>
				{type}
			</Tag>
		);
	};

	const onDataChange = (e: React.FormEvent<HTMLInputElement>)=>{
    console.log(e.currentTarget.value)
    const newState = e.currentTarget.value
    setEvent(newState);
	}

    const input = currentTask !== null ? <input onChange={onDataChange} value={event ? event : ''} /> : null



const content = currentTask ? (
<> {input}
		<Table dataSource={currentTask}>
			<Column key="dateTime" title="Data" dataIndex="dateTime" />
			<Column key="name" title="Name" dataIndex="name" />
			<Column
				key="type"
				title="Type"
				dataIndex="type"
				render={(type: string, id: string) => renderTags(type, id)}
			/>
			<Column key="timeZone" title="TimeZone" dataIndex="timeZone" />
			<Column key="description" title="Description" dataIndex="description" />
			<Column key="place" title="Place" dataIndex="place" />
		</Table>
		</>
) : (<h6>Loading...</h6>)

	return (
	<>{content}</>
	);
};
