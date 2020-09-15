import React, { useState } from 'react';
import { Table, Tag } from 'antd';
import { EventsType } from '../../types/types';

const { Column } = Table;


export const ScheduleTable = (props: any) => {

	const [currentEvents, setCurrentEvents] = useState(props.data.events as Array<EventsType>);
  const [event, setEvent] = useState(currentEvents && currentEvents[0].name);
  const [ editEvent, setEditEvent] = useState(false)
  const toggle = () => setEditEvent(!editEvent);


	const { events } = props.data;
	const eventsWithKey = events.map((item: { key: any; id: any }) => {
		item.key = item.id;
		return item;
	});

  
  const disableEditEvent = () => {
    toggle();
    if(currentEvents && event) setCurrentEvents([ ...props.data.events, events[0].name = event])
    props.putEvent(currentEvents[0], currentEvents[0].id)
    props.requestEvents()
  }
  const enableEditEvent = () => {
    toggle()
  }

	const onDataChange = (e: React.FormEvent<HTMLInputElement>) => {
		console.log(e.currentTarget.value)
		const newState = e.currentTarget.value
		setEvent(newState);
  }
  
  	const renderTags = (type: string, id: string) => {
		const color = type === 'deadline' ? 'red' : 'green';
		return (
			<Tag color={color} key={id}>
				{type}
			</Tag>
		);
  };

	const input = currentEvents !== null ?  <div>
  {!editEvent &&
          <span onDoubleClick={enableEditEvent}>{event ? event : ''}</span>
  }
  {editEvent &&
          <input onChange={onDataChange} autoFocus={true} onBlur={disableEditEvent} value={event ? event : ''} onKeyPress={k => {
                if (k.key === 'Enter') disableEditEvent()
              }}/>
  }
</div> : null

	const content = currentEvents ? (
		<> {input}
			<Table dataSource={currentEvents} >
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
	console.log('event', event);

	return (
		<>{content}</>
	);
};
