/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { IInitialState } from 'src/types/types';
import { TaskCard } from '../TaskCard/TaskCard';

export const ScheduleList = ({ data, timeZone }: { data: IInitialState, timeZone: string }) => {
  return <>
    {data.events.map((event) => {
      return <TaskCard key={event.id} event={event} currentTimeZone={timeZone} />
    })}
  </>;
}