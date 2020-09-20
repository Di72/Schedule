import React, { useState } from 'react';
import { Button, Select, Spin, Table, Tag } from 'antd';
import { EventsType } from '../../types/types';
import { CSSProperties } from 'styled-components';
import './ScheduleTable.less';
import moment from 'moment-timezone';
import { Option } from 'antd/lib/mentions';

export const ScheduleTable = (props: any) => {
  const { events, timeZone } = props.data;
  const [currentEvents, setCurrentEvents] = useState(events as Array<EventsType>);

  const disableEditEvent = (index: any) => {
    props.putEvent(currentEvents[index], currentEvents[index].id)
    props.requestEvents()
  }
  const deleteEvent = (value: any, index: any) => {
    const new_state = currentEvents.filter(item => item.id !== value.id)
    setCurrentEvents(new_state)
    props.deleteEvent(currentEvents[index].id)
    props.requestEvents()
  }

  const taskType = [
    "js task",
    "basic task",
    "html/css task",
    "git task"
  ]
  const optionsTaskType = taskType.map((type: string) => {
    return <Option style={{ paddingLeft: 15 }} value={type}>{type}</Option>
  })  

  const placeType = [
    "online",
    "offline"
  ]
  const optionsPlaceType = placeType.map((place: string) => {
    return <Option style={{ paddingLeft: 15 }} value={place}>{place}</Option>
  })  


  const renderPlace = (value: any, index: any) => {


    return (<>
   {!props.data.editStatus ? (<input
          onChange={onDataChangeHandler}
          style={inputCSS}
          data-key={"place"}
          data-index={index}
          type="text"
          disabled={!props.data.editStatus}
          value={value.place}
          onBlur={() => disableEditEvent(index)}
          onKeyPress={k => onKeyPress(k, index)} />) : (<Select className='selectStyle' defaultValue={value.place} onChange={(e)=>onDataChangePlace(index, e)}>
                  {optionsPlaceType}
                </Select>)}
    </>);
  };

  const renderTags = (value: any, index: any) => {
    let color = '';
    switch (value.type) {
      case 'deadline':
        color = '#d4380d';
        break;
      case 'basic task':
        color = '#52c41a';
        break;
      case 'html/css task':
        color = '#13c2c2';
        break;
      case 'js task':
        color = '#1890ff';
        break;
      case 'git task':
        color = '#722ed1';
        break;
      default:
        color = 'uuuu';
        break;
    }

    return (<>
   {!props.data.editStatus ? (<Tag color={color} key={index}>
        {value.type}
      </Tag>) : (<Select className='selectStyle' defaultValue={value.type} onChange={(e)=>onDataChangeType(index, e)}>
                  {optionsTaskType}
                </Select>)}
    </>);
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

  const onDataChangeType = (index: number, e: any) => {
  setCurrentEvents([...currentEvents, currentEvents[index].type = e]);
  disableEditEvent(index)
  }

  const onDataChangePlace = (index: number, e: any) => {
  setCurrentEvents([...currentEvents, currentEvents[index].place = e]);
  disableEditEvent(index)
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
      title: "Date",
      data: "dateTime",
      key: "dateTime",
      width: 140,
      render: (value: any, record: any, index: any) => {
        return <input
          onChange={onDataChangeHandler}
          style={inputCSS}
          data-key={"dateTime"}
          data-index={index}
          type="text"
          disabled={!props.data.editStatus}
          value={moment(+value.dateTime).tz(timeZone).format('YYYY-MM-DD HH:mm')}
          onBlur={() => disableEditEvent(index)}
          onKeyPress={k => onKeyPress(k, index)} />;
      }
    },
    {
      title: "Deadline",
      data: "deadline",
      key: "deadline",
      width: 140,
      render: (value: any, record: any, index: any) => {
        return value.deadline && <input
          onChange={onDataChangeHandler}
          style={inputCSS}
          data-key={"timeZone"}
          data-index={index}
          type="text"
          disabled={!props.data.editStatus}
          value={moment(+value.deadline).tz(timeZone).format('YYYY-MM-DD HH:mm')}
          onBlur={() => disableEditEvent(index)}
          onKeyPress={k => onKeyPress(k, index)}
        />;
      }
    },
    {
      title: "Name",
      data: "name",
      key: "name",
      width: 180,
      render: (value: any, record: any, index: any) => {
        return <input
          onChange={onDataChangeHandler}
          style={inputCSS}
          data-key={"name"}
          data-index={index}
          type="text"
          disabled={!props.data.editStatus}
          value={value.name}
          onBlur={() => disableEditEvent(index)}
          onKeyPress={k => onKeyPress(k, index)} />;
      }
    },
    {
      title: "Type",
      data: "type",
      filters: [
        {
          text: 'basic task',
          value: 'basic task',
        },
        {
          text: 'html/css task',
          value: 'html/css task',
        },
        {
          text: 'js task',
          value: 'js task',
        },
        {
          text: 'git task',
          value: 'git task',
        },
        {
          text: 'deadline',
          value: 'deadline',
        },
      ],
      filterMultiple: false,
      onFilter: (value: any, record: any) => !props.data.editStatus && record.type.indexOf(value) === 0,
      key: "type",
      width: 100,
      render: (value: any, record: any, index: any) => renderTags(value, index)
    },
    {
      title: "Description",
      data: "description",
      key: "description",
      render: (value: any, record: any, index: any) => {
        return <input
          onChange={onDataChangeHandler}
          style={inputCSS}
          data-key={"description"}
          data-index={index}
          type="text"
          disabled={!props.data.editStatus}
          value={value.description}
          onBlur={() => disableEditEvent(index)}
          onKeyPress={k => onKeyPress(k, index)} />;
      }
    },
    {
      key: "place",
      title: "Place",
      data: "place",
      width: 80,
      render: (value: any, record: any, index: any) => renderPlace(value, index)
    }
  ]

  props.data.editStatus && columnsData.push({
    key: "id",
    title: "Delete Event",
    data: "id",
    width: 80,
    render: (value: any, record: any, index: any) => <Button type="primary" danger onClick={()=>deleteEvent(value, index)}>Delete</Button>
  })


  const content = currentEvents ? (
    <Table dataSource={currentEvents} columns={columnsData} rowKey={(item) => item.id} />
  ) : (<Spin size="large" tip="Loading..." />)

  return (<>{content}</>);
};
