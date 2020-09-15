import { AppStateType } from "./store";

export const setEventsAndOrganizerSelector = (state: AppStateType) => state.eventsReducer;

export const createEventReducer = (state: AppStateType) => state.eventsReducer.createEvent;

