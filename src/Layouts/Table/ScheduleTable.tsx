import { Button, Checkbox, DatePicker, Select, Spin, Table } from 'antd';
import Column from 'antd/lib/table/Column';
import moment, { Moment } from 'moment-timezone';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CSSProperties } from 'styled-components';
import { EventsType, IFieldOfEventsType, InitialStateType } from '../../types/types';
import { ScheduleTags } from '../Tags/Tags';
import './ScheduleTable.less';

const { Option } = Select;

function disabledDate(current: Moment) {
  return current && current < moment().endOf('day');
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const ScheduleTable = (props: any): JSX.Element => {
  const { data } = props;
  const { events, timeZone } = data as InitialStateType;
  const [currentEvents, setCurrentEvents] = useState(events as Array<EventsType>);
  const [checkboxColumns, setCheckboxColumns] = useState(['Date', 'Deadline', 'Type', 'Description', 'Place']);

  useEffect(() => {
    setCurrentEvents(events);
  }, [events]);

  const disableEditEvent = (index: number) => {
    props.putEvent(currentEvents[index], currentEvents[index].id);
  };

  const deleteEvent = (value: string, index: number) => {
    const newState = currentEvents.filter((item: any) => item.id !== value);
    setCurrentEvents(newState);
    props.deleteEvent(currentEvents[index].id);
    props.requestEvents();
  };

  const plainOptions = ['Date', 'Deadline', 'Type', 'Description', 'Place'];
  const defaultCheckedList = ['Date', 'Deadline', 'Type', 'Description', 'Place'];

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

  const renderPlace = (value: string, index: number) => {
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
            onKeyPress={(k) => onKeyPress(k, index)}
          />
        ) : (
          <Select className="selectStyle" defaultValue={value} onChange={(e) => onDataChangeSelect(index, e, 'place')}>
            {optionsPlaceType}
          </Select>
        )}
      </>
    );
  };

  const renderTags = (value: string, index: number) => {
    return (
      <>
        {!props.data.editStatus ? (
          <ScheduleTags typeTask={value} key={String(index)} />
        ) : (
          <Select className="selectStyle" defaultValue={value} onChange={(e) => onDataChangeSelect(index, e, 'type')}>
            {optionsTaskType}
          </Select>
        )}
      </>
    );
  };

  const changeDataPickerHandler = (e:Moment, index:any, key:String) => {
    const oldState = [...currentEvents];
    const newEvent = { ...currentEvents[index] };
    const propertyName = key as IFieldOfEventsType;
    newEvent[propertyName] = String(e.toDate().getTime());
    const newState = [...oldState];
    newState[index] = newEvent;
    setCurrentEvents(newState);
  }

  const onDataChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { index, key } = e.currentTarget.dataset as any;
    const oldState = [...currentEvents];
    const newEvent = { ...currentEvents[index] };
    const propertyName = key as IFieldOfEventsType;
    newEvent[propertyName] = e.currentTarget.value;
    const newState = [...oldState];
    newState[index] = newEvent;
    setCurrentEvents(newState);
  };

  const onDataChangeSelect = (index: number, e: any, field: 'type' | 'place') => {
    const changedEvent = { ...currentEvents[index] };
    changedEvent[field] = e;
    const newState = [...currentEvents];
    newState[index] = changedEvent;
    setCurrentEvents(() => newState);
    props.putEvent(changedEvent);
  };

  const onKeyPress = (k: React.KeyboardEvent<HTMLInputElement>, index: any): void => {
    if (k.key === 'Enter') {
      const currentEl = k.target as HTMLElement;
      disableEditEvent(index);
      currentEl.blur();
    }
  };

  const inputCSS: CSSProperties = {
    border: 'none',
    boxShadow: `${!data.editStatus ? 'none' : '0px 0px 3px 3px lightblue'}`,
    padding: 0,
    backgroundColor: 'transparent',
    width: '100%',
    boxSizing: 'border-box',
  };

  const changeColumns = (e: any) => {
    setCheckboxColumns(e);
  };

  const history = useHistory();
  const clickRow = (record: any) => {
    !props.data.editStatus && history.push(`/list/${record.id}`);
  };

  const content = currentEvents ? (
    <>
      <Checkbox.Group options={plainOptions} defaultValue={defaultCheckedList} onChange={changeColumns} />
      <Table
        dataSource={currentEvents}
        rowKey={(item) => item.id}
        onRow={(record: any) => {
          return {
            onClick: () => clickRow(record),
          };
        }}
      >
        {checkboxColumns.find((item) => item === 'Date') && (
          <Column
            title="Date"
            dataIndex="dateTime"
            key="dateTime"
            render={(value: any, key: any, index: any) => (
              <DatePicker
                onChange={(e:any) => {
                  changeDataPickerHandler(e, index, key)
                }}
                style={inputCSS}
                data-key="dateTime"
                data-index={index}
                disabled={!props.data.editStatus}
                showTime={{ defaultValue: moment('23:59:59', 'HH:mm:ss') }}
                defaultValue={moment(+value).tz(timeZone)}
                disabledDate={disabledDate}
              />
            )}
          />
        )}
        {checkboxColumns.find((item) => item === 'Deadline') && (
          <Column
            title="Deadline"
            dataIndex="deadline"
            key="deadline"
            render={(value: any, key: any, index: any) =>
              value && (
                <DatePicker
                onChange={(e:any) => {
                  changeDataPickerHandler(e, index, key)
                }}
                style={inputCSS}
                data-key="deadline"
                data-index={index}
                disabled={!props.data.editStatus}
                showTime={{ defaultValue: moment('23:59:59', 'HH:mm:ss') }}
                defaultValue={moment(+value).tz(timeZone)}
                disabledDate={disabledDate}
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
            onFilter={(value: any, record: any) => !props.data.editStatus && record.type.indexOf(value) === 0}
            render={(value: any, record: any, index: any) => renderTags(value, index)}
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
            render={(value: any, record: any, index: any) => renderPlace(value, index)}
          />
        )}
        {data.editStatus && (
          <Column
            title="Delete Event"
            dataIndex="id"
            key="id"
            render={(value: any, record: any, index: any) => (
              <Button type="primary" danger onClick={() => deleteEvent(value, index)}>
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
