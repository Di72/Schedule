import { Button, Checkbox, Select, Spin, Table, Tag } from 'antd';
import Column from 'antd/lib/table/Column';
import moment from 'moment-timezone';
import React, { useState } from 'react';
import { CSSProperties } from 'styled-components';
import { EventsType, IFieldOfEventsType } from '../../types/types';
import './ScheduleTable.less';

const { Option } = Select;

export const ScheduleTable = (props: any) => {
  const { events, timeZone } = props.data;
  const [currentEvents, setCurrentEvents] = useState(
    events as Array<EventsType>
  );
  const [checkboxColumns, setCheckboxColumns] = useState([
    'Date',
    'Deadline',
    'Type',
    'Description',
    'Place',
  ]);

  const disableEditEvent = (index: any) => {
    props.putEvent(currentEvents[index], currentEvents[index].id);
    props.requestEvents();
  };
  const deleteEvent = (value: any, index: any) => {
    const newState = currentEvents.filter((item: any) => item.id !== value);
    setCurrentEvents(newState);
    props.deleteEvent(currentEvents[index].id);
    props.requestEvents();
  };

  const plainOptions = ['Date', 'Deadline', 'Type', 'Description', 'Place'];
  const defaultCheckedList = [
    'Date',
    'Deadline',
    'Type',
    'Description',
    'Place',
  ];

  const taskType = ['js task', 'basic task', 'html/css task', 'git task'];
  const optionsTaskType = taskType.map((type: string) => {
    return (
      <Option key={type} style={{ paddingLeft: 15 }} value={type}>
        {type}
      </Option>
    );
  });

  const placeType = ['online', 'offline'];
  const optionsPlaceType = placeType.map((place: string) => {
    return (
      <Option key={place} style={{ paddingLeft: 15 }} value={place}>
        {place}
      </Option>
    );
  });

  const renderPlace = (value: any, index: any) => {
    return (
      <>
        {!props.data.editStatus ? (
          <input
            onChange={onDataChangeHandler}
            style={inputCSS}
            data-key="place"
            data-index={index}
            type="text"
            disabled={!props.data.editStatus}
            value={value}
            onBlur={() => disableEditEvent(index)}
            onKeyPress={(k) => onKeyPress(k, index)}
          />
        ) : (
          <Select
            className="selectStyle"
            defaultValue={value}
            onChange={(e) => onDataChangePlace(index, e)}
          >
            {optionsPlaceType}
          </Select>
        )}
      </>
    );
  };

  const renderTags = (value: any, index: any) => {
    let color = '';
    switch (value) {
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

    return (
      <>
        {!props.data.editStatus ? (
          <Tag color={color} key={index}>
            {value}
          </Tag>
        ) : (
          <Select
            className="selectStyle"
            defaultValue={value}
            onChange={(e) => onDataChangeType(index, e)}
          >
            {optionsTaskType}
          </Select>
        )}
      </>
    );
  };

  const onDataChangeHandler = (e: any) => {
    const {
      index,
      key,
    }: { index: number; key: IFieldOfEventsType } = e.currentTarget.dataset;
    const oldState = [...currentEvents];
    const newEvent = { ...currentEvents[index] };
    const propertyName: IFieldOfEventsType = key;
    newEvent[propertyName] = e.currentTarget.value;
    const newState = [...oldState];
    newState[index] = newEvent;
    setCurrentEvents(newState);
  };

  const onDataChangeType = (index: number, e: any) => {
    setCurrentEvents([...currentEvents, (currentEvents[index].type = e)]);
    disableEditEvent(index);
  };

  const onDataChangePlace = (index: number, e: any) => {
    setCurrentEvents([...currentEvents, (currentEvents[index].place = e)]);
    disableEditEvent(index);
  };

  const onKeyPress = (
    k: React.KeyboardEvent<HTMLInputElement>,
    index: any
  ): void => {
    if (k.key === 'Enter') {
      const currentEl = k.target as HTMLElement;
      disableEditEvent(index);
      currentEl.blur();
    }
  };

  const inputCSS: CSSProperties = {
    border: 'none',
    boxShadow: `${
      !props.data.editStatus ? 'none' : '0px 0px 3px 3px lightblue'
    }`,
    padding: 0,
    backgroundColor: 'transparent',
    width: '100%',
    boxSizing: 'border-box',
  };

  const changeColumns = (e: any) => {
    setCheckboxColumns(e);
  };

  const content = currentEvents ? (
    <>
      <Checkbox.Group
        options={plainOptions}
        defaultValue={defaultCheckedList}
        onChange={changeColumns}
      />
      <Table dataSource={currentEvents} rowKey={(item) => item.id}>
        {checkboxColumns.find((item) => item === 'Date') && (
          <Column
            title="Date"
            dataIndex="dateTime"
            key="dateTime"
            render={(value: any, record: any, index: any) => (
              <input
                onChange={onDataChangeHandler}
                style={inputCSS}
                data-key="dateTime"
                data-index={index}
                type="text"
                disabled={!props.data.editStatus}
                value={moment(+value)
                  .tz(timeZone)
                  .format('YYYY-MM-DD HH:mm')}
                onBlur={() => disableEditEvent(index)}
                onKeyPress={(k) => onKeyPress(k, index)}
              />
            )}
          />
        )}
        {checkboxColumns.find((item) => item === 'Deadline') && (
          <Column
            title="Deadline"
            dataIndex="deadline"
            key="deadline"
            render={(value: any, record: any, index: any) =>
              value && (
                <input
                  onChange={onDataChangeHandler}
                  style={inputCSS}
                  data-key="timeZone"
                  data-index={index}
                  type="text"
                  disabled={!props.data.editStatus}
                  value={moment(+value)
                    .tz(timeZone)
                    .format('YYYY-MM-DD HH:mm')}
                  onBlur={() => disableEditEvent(index)}
                  onKeyPress={(k) => onKeyPress(k, index)}
                />
              )
            }
          />
        )}
        <Column
          title="Name"
          dataIndex="name"
          key="name"
          render={(value: any, record: any, index: any) => (
            <input
              onChange={onDataChangeHandler}
              style={inputCSS}
              data-key="name"
              data-index={index}
              type="text"
              disabled={!props.data.editStatus}
              value={value}
              onBlur={() => disableEditEvent(index)}
              onKeyPress={(k) => onKeyPress(k, index)}
            />
          )}
        />
        {checkboxColumns.find((item) => item === 'Type') && (
          <Column
            title="Type"
            dataIndex="type"
            filters={[
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
            ]}
            key="type"
            filterMultiple={false}
            onFilter={(value: any, record: any) =>
              !props.data.editStatus && record.type.indexOf(value) === 0
            }
            render={(value: any, record: any, index: any) =>
              renderTags(value, index)
            }
          />
        )}
        {checkboxColumns.find((item) => item === 'Description') && (
          <Column
            title="Description"
            dataIndex="description"
            key="description"
            render={(value: any, record: any, index: any) => (
              <input
                onChange={onDataChangeHandler}
                style={inputCSS}
                data-key="description"
                data-index={index}
                type="text"
                disabled={!props.data.editStatus}
                value={value}
                onBlur={() => disableEditEvent(index)}
                onKeyPress={(k) => onKeyPress(k, index)}
              />
            )}
          />
        )}
        {checkboxColumns.find((item) => item === 'Place') && (
          <Column
            title="Place"
            dataIndex="place"
            key="place"
            render={(value: any, record: any, index: any) =>
              renderPlace(value, index)
            }
          />
        )}
        {props.data.editStatus && (
          <Column
            title="Delete Event"
            dataIndex="id"
            key="id"
            render={(value: any, record: any, index: any) => (
              <Button
                type="primary"
                danger
                onClick={() => deleteEvent(value, index)}
              >
                Delete
              </Button>
            )}
          />
        )}
      </Table>
    </>
  ) : (
    <Spin size="large" tip="Loading..." />
  );

  return <>{content}</>;
};
