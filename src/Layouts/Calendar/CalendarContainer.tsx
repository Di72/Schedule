import moment from 'moment';
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { ICalendarContainer, ICalendarContainerProps } from 'src/types/types';
import { addOneDay } from '../../units';
import './style.less';

const CalendarContainer: ICalendarContainer = ({ data: { events } }: ICalendarContainerProps) => {
  const localizer = momentLocalizer(moment);
  const modifiedEventsData = events.map((el: any) => {
    if (!el.deadline) return {};

    const startDate = new Date(Number(el.dateTime));
    const deadlineDate = addOneDay(new Date(Number(el.deadline)));

    return {
      title: el.description,
      start: startDate,
      end: deadlineDate,
      allDay: true,
      resource: el.comment,
    };
  });

  const onSelectEvent = (e: any) => {
    // eslint-disable-next-line no-console
    console.log(e.resource);
  };

  return (
    <div className="calendarContainer">
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
  );
};

export default CalendarContainer;
