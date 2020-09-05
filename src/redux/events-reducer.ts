import { EventsType } from '../types/types';

let initialState = {
	data: [] as Array<EventsType>
};
type InitialStateType = typeof initialState;

const eventsReducer = (state = initialState, action: any) => {
    switch (action.type) {
    case 'SN/GET_EVENTS': {
        return {...state}
    }
    default:
        return state;
}
};

export const actions = {
    getEvents: () => ({type: 'SN/USERS/SET_USERS'} as const),
}



export default eventsReducer;
