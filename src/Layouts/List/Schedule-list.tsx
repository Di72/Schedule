import React from 'react';
import { EventsType, IInitialState } from 'src/types/types';
import { TaskCard } from '../TaskCard/TaskCard';

export const ScheduleList = ({ data, timeZone }: { data: IInitialState; timeZone: string }): JSX.Element => {
  const cards = data.events.map((event: EventsType) => {
    return <TaskCard key={event.id} event={event} currentTimeZone={timeZone} />;
  });

  return <>{cards}</>;
};
