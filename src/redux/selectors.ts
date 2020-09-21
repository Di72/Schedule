import { AppStateType } from './store';

export const setEventsAndOrganizerSelector = (state: AppStateType) =>
  state.eventsReducer;

export const isNewTaskPostedSelector = (state: AppStateType) =>
  state.eventsReducer.postEvent;
