import { AppStateType } from '../redux/store';

export const getdefaultanimName = (state: AppStateType) => {
	return state.eventsReducer;
};
