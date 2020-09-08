import { AppStateType } from '../redux/store';

export const setEventsAndOrganizer = (state: AppStateType) => {
	return state.eventsReducer;
};
