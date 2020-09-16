import React from 'react';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import { dataModification, addOneDay } from '../../units';

import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './style.less';

const localizer = momentLocalizer(moment);

const CalendarContainer = (props: any) => {
  const events = props.data.events;

  const modifiedEventsData = events.map((el: any) => {
    if (!el.deadline) return {};

    const startDate = dataModification(el.dateTime);
    const deadlineDate = addOneDay(dataModification(el.deadline));

    return {
      title: el.description,
      start: startDate,
      end: deadlineDate,
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
          day: true,
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
