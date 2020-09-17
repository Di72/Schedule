import React, { useState } from 'react';
import { Table, Tag } from 'antd';
import { EventsType } from '../../types/types';
import { CSSProperties } from 'styled-components';

export const ScheduleTable = (props: any) => {
  const { events } = props.data;
  const [currentEvents, setCurrentEvents] = useState(events as Array<EventsType>);

  const disableEditEvent = (index: any) => {
    props.putEvent(currentEvents[index], currentEvents[index].id)
    props.requestEvents()
  }

  const renderTags = (value: any, index: any) => {
    const color = value.type === 'deadline' ? '#d4380d' : 
    value.type ==='basic task' ? '#52c41a' :
    value.type ==='html/css task' ? '#13c2c2' :
    value.type ==='js task' ? '#1890ff' :
    value.type ==='git task' ? '#722ed1' :
  'uuuu';
  //   const color = value.type === 'deadline' ? '#d4380d' : 
  //   'basic task' ? '#52c41a' :
  //   'html/css task' ? '#13c2c2' :
  //   'js task' ? '#1890ff' :
  //   'git task' ? '#722ed1' :
  // 'uuuu';
    return (
      <Tag color={color} key={index}>
        {value.type}
      </Tag>
    );
  };

  const onDataChangeHandler = (e: any) => {
    const index = e.currentTarget.dataset.index;
    const oldState = [...currentEvents];
    const newEvent = { ...currentEvents[index] };
    type gay = "name" | "description" | "descriptionUrl" | "comment" | "place" | "type" | "timeZone" | "dateTime" | "deadline" | "id";
    const propertyName: gay = e.currentTarget.dataset.key;
    newEvent[propertyName] = e.currentTarget.value;
    const newState = [...oldState];
    newState[index] = newEvent
    setCurrentEvents(newState);
  }

  const onKeyPress = (k: React.KeyboardEvent<HTMLInputElement>, index: any): void => {
    if (k.key === 'Enter') {
      const currentEl = k.target as HTMLElement;
      disableEditEvent(index);
      currentEl.blur();
    }
  }

  const inputCSS: CSSProperties = {
    border: "none", boxShadow: `${!props.data.editStatus ? "none" : "0px 0px 3px 3px lightblue"}`, padding: 0, backgroundColor: 'transparent', width: "100%", boxSizing: "border-box"
  };

  const columnsData = [
    {
      title: "dateTime",
      data: "Data",
      key: "dateTime",
      
      render: (value: any, record: any, index: any) => {
        return <input onChange={onDataChangeHandler} style={inputCSS} data-key={"dateTime"} data-index={index} type="text" disabled={!props.data.editStatus}
          value={value.dateTime} onBlur={() => disableEditEvent(index)} onKeyPress={k => onKeyPress(k, index)} />;
      }
    },
    {
      title: "name",
      data: "Name",
      key: "name",
      sorter: (a: any, b: any) => a.name.length - b.name.length,
      render: (value: any, record: any, index: any) => {
        return <input onChange={onDataChangeHandler} style={inputCSS} data-key={"name"} data-index={index} type="text" disabled={!props.data.editStatus}
          value={value.name} onBlur={() => disableEditEvent(index)} onKeyPress={k => onKeyPress(k, index)} />;
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
      render: (value: any, record: any, index: any) => {
        return <input onChange={onDataChangeHandler} style={inputCSS} data-key={"timeZone"} data-index={index} type="text" disabled={!props.data.editStatus}
          value={value.timeZone} onBlur={() => disableEditEvent(index)} onKeyPress={k => onKeyPress(k, index)} />;
      }
    },
    {
      key: "description",
      title: "Description",
      data: "description",
      render: (value: any, record: any, index: any) => {
        return <input onChange={onDataChangeHandler} style={inputCSS} data-key={"description"} data-index={index} type="text" disabled={!props.data.editStatus}
          value={value.description} onBlur={() => disableEditEvent(index)} onKeyPress={k => onKeyPress(k, index)} />;
      }
    },
    {
      key: "place",
      title: "Place",
      data: "place",
      render: (value: any, record: any, index: any) => {
        return <input onChange={onDataChangeHandler} style={inputCSS} data-key={"place"} data-index={index} type="text" disabled={!props.data.editStatus}
          value={value.place} onBlur={() => disableEditEvent(index)} onKeyPress={k => onKeyPress(k, index)} />;
      }
    }
  ]

  const content = currentEvents ? (
    <Table dataSource={currentEvents} columns={columnsData} rowKey={(item) => item.id} />
  ) : (<h6>Loading...</h6>)

  return (<>{content}</>);
};
