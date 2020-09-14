import { AppStateType } from "./store";

export const setEventsAndOrganizerSelector = (state: AppStateType) => state.eventsReducer;

export const createEventReduser = (state: AppStateType) => state.eventsReducer.createEvent;

