import React, { useState } from 'react';
import { Table, Tag } from 'antd';
import { EventsType } from '../../types/types';


export const ScheduleTable = (props: any) => {
  console.log(props.data.editStatus, 'Права редактирования');
	const [currentEvents, setCurrentEvents] = useState(props.data.events as Array<EventsType>);
  // const [event, setEvent] = useState(currentEvents && currentEvents[0].name);
  // const [ editEvent, setEditEvent] = useState(false)
  // const toggle = () => setEditEvent(!editEvent);


	const { events } = props.data;
	const eventsWithKey = events.map((item: { key: any; id: any }) => {
		item.key = item.id;
		return item;
	});

  
  const disableEditEvent = (index: any) => {
    console.log(currentEvents[index])
    props.putEvent(currentEvents[index], currentEvents[index].id)
    props.requestEvents()
    // if(currentEvents && event) setCurrentEvents([ ...props.data.events, events[0].name = event])
  }
  // const enableEditEvent = () => {
  //   toggle()
  // }

	// const onDataChange = (e: React.FormEvent<HTMLInputElement>) => {
	// 	console.log(e.currentTarget.value)
	// 	const newState = e.currentTarget.value
	// 	setEvent(newState);
  // }
  
  const renderTags = (value: any, index: any) => {
    const color = value.type === 'deadline' ? 'red' : 'green';
		return (
			<Tag color={color} key={index}>
				{value.type}
			</Tag>
		);
  };

  const onDataChangeHandler = (e: any) => {
    const index = e.currentTarget.dataset.index;
    const oldState = [...currentEvents];
    const newEvent = {...currentEvents[index]};
    type gay = "name" | "description" | "descriptionUrl" | "comment" | "place" | "type" | "timeZone" | "dateTime" | "deadline" | "id";
    const propertyName: gay = e.currentTarget.dataset.key;
    newEvent[propertyName] = e.currentTarget.value;
    const newState = [...oldState];
    newState[index] = newEvent
    console.log(oldState[index][propertyName], newState[index][propertyName], 'old and new');
    setCurrentEvents(newState);

  }

  const inputCSS = {
    border: "none", boxShadow: `${!props.data.editStatus ? "none" : "0px 0px 3px 3px lightblue" }`, padding: 0, backgroundColor: 'transparent', width: "100%", boxsizing:  "border-box" };

  const columnsData = [
    {
      title: "dateTime",
      data: "Data",
      key: "dateTime",
      render: (value: any, record: any, index: any) => {
        return <input onChange={onDataChangeHandler} style={inputCSS} data-key={"dateTime"} data-index={index} type="text" disabled={!props.data.editStatus}
         value={value.dateTime} onBlur={()=>disableEditEvent(index)} onKeyPress={k => {if (k.key === 'Enter') disableEditEvent(index)}}/>;
      }
    },
    {
      title: "name",
      data: "Name",
      key: "name",
      render: (value: any, record: any, index: any) => {
        return <input onChange={onDataChangeHandler} style={inputCSS} data-key={"name"} data-index={index} type="text" disabled={!props.data.editStatus} 
        value={value.name} onBlur={()=>disableEditEvent(index)} onKeyPress={k => {if (k.key === 'Enter') disableEditEvent(index)}}/>;
      }
    },
    {
      key: "type",
      title: "Type",
      data: "type",
      render: (value: any, record: any, index: any) => renderTags(value, index)
      
    },
    {
      key: "timeZone",
      title: "TimeZone",
      data: "timeZone",
      render: (value: any,  record: any, index: any) => {
        return <input onChange={onDataChangeHandler} style={inputCSS} data-key={"timeZone"} data-index={index} type="text" disabled={!props.data.editStatus}
         value={value.timeZone} onBlur={()=>disableEditEvent(index)} onKeyPress={k => {if (k.key === 'Enter') disableEditEvent(index)}}/>;
      }
    },
    {
      key: "description",
      title: "Description",
      data: "description",
      render: (value: any,  record: any, index: any) => {
        return <input onChange={onDataChangeHandler} style={inputCSS} data-key={"description"} data-index={index} type="text" disabled={!props.data.editStatus}
         value={value.description} onBlur={()=>disableEditEvent(index)} onKeyPress={k => {if (k.key === 'Enter') disableEditEvent(index)}}/>;
      }
    },
    {
      key: "place",
      title: "Place",
      data: "place",
      render: (value: any,  record: any, index: any) => {
        return <input onChange={onDataChangeHandler} style={inputCSS} data-key={"place"} data-index={index} type="text" disabled={!props.data.editStatus}
         value={value.place} onBlur={()=>disableEditEvent(index)} onKeyPress={k => {if (k.key === 'Enter') disableEditEvent(index)}}/>;
      }
    }
  ]


// 	const input = currentEvents !== null ?  <div>
//   {!editEvent &&
//           <span onDoubleClick={enableEditEvent}>{event ? event : ''}</span>
//   }
//   {editEvent &&
//           <input  autoFocus={true}  value={event ? event : ''} onBlur={disableEditEvent} onKeyPress={k => {if (k.key === 'Enter') disableEditEvent()}}/>
//   }
// </div> : null

	const content = currentEvents ? (
		<> 
			<Table dataSource={currentEvents} columns={columnsData}/>
		</>
	) : (<h6>Loading...</h6>)

	return (
		<>{content}</>
	);
};
