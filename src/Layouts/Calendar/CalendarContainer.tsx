import React, { useState, useEffect } from 'react'
// import { Calendar, Badge } from 'antd';
import {Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
// import 'moment/locale/ru';
import { httpRequests } from '../../api/ts';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './style.less';
import { eventsTask } from './Events';
import Axios from 'axios';
 
const localizer = momentLocalizer(moment);

const owerEvents = eventsTask.map((el) => {
  const taskDate = el.dateTime.split('/')
  const day = Number(taskDate[0]);
  const month = Number(taskDate[1]) - 1;
  const year = Number('20'+taskDate[2]);
  return {
    title: el.description,
    start: new Date(year, month, day),
    end: new Date( year, month, day),
    allDay: true,
    resource: el.comment
  }
})

export const CalendarContainer = (props:any) => {
  const [events, setEvents] = useState([]);

  useEffect (() => {
    const getEvents = async () => {
      const result = await httpRequests.getEvents();
      // setEvents(result)
      console.log(result);
    } 
    getEvents();
  }, [])

  const onSelectEvent = (e:any) => {
    console.log(e.resource);
  }

  return (
  <div className='calendarContainer'>
    <Calendar
      step={60}
      views={{
        month: true,
      }}
      localizer={localizer}
      events={owerEvents}
      startAccessor="start"
      endAccessor="end"
      onSelectEvent={onSelectEvent}
    />
  </div>
  )
}