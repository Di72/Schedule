import React from 'react';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import './style.less';

const refatcorDates = (date:any) => {
  const taskStaretDate = date.split('/');
  const day = Number(taskStaretDate[0]);
  const month = Number(taskStaretDate[1]) - 1;
  const year = Number('20' + taskStaretDate[2]);

  return {day, month, year}
}

const localizer = momentLocalizer(moment);

const CalendarContainer = (props: any) => {
  const events = props.data.events;

  const modifiedEventsData = events.map((el: any) => {
    if(!el.deadline) return {};

    console.log(true);

    const startDate = refatcorDates(el.dateTime);
    const deadlineDate = refatcorDates(el.deadline)

    return {
      title: el.description,
      start: new Date(startDate.year, startDate.month, startDate.day),
      end: new Date(deadlineDate.year, deadlineDate.month, deadlineDate.day),
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
