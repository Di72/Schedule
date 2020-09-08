import React from 'react';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import './style.less';

const localizer = momentLocalizer(moment);

const CalendarContainer = (props: any) => {
  const events = props.data.events;

  const modifiedEventsData = events.map((el: any) => {
    const taskDate = el.dateTime.split('/')
    const day = Number(taskDate[0]);
    const month = Number(taskDate[1]) - 1;
    const year = Number('20' + taskDate[2]);
    return {
      title: el.description,
      start: new Date(year, month, day),
      end: new Date(year, month, day),
      allDay: true,
      resource: el.comment
    }
  })

  const onSelectEvent = (e: any) => {
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
        events={modifiedEventsData}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={onSelectEvent}
      />
    </div>
  )
}

export default CalendarContainer;
