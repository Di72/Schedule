import { httpRequests } from './../api/api';
import { EventsType, OrganizersType } from '../types/types';
import { InferActionsTypes, BaseThunkType } from './store';

let initialState = {
    events: [] as Array<EventsType>,
    organizers: [] as Array<OrganizersType>
};


const eventsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/SET_EVENTS': {
            return {...state, events: action.response}
        }
        case 'SN/SET_ORGANIZERS': {
            return {...state, organizers: action.response}
        }
        default:
            return state;
    }
};

export const actions = {
    setEvents: (response: Array<EventsType>) => ({type: 'SN/SET_EVENTS', response} as const),
    setOrganizers: (response: Array<OrganizersType>) => ({type: 'SN/SET_ORGANIZERS', response} as const),
}

export const getEvents = (): ThunkType => async (dispatch) => {
    const response = await httpRequests.getEvents();
    console.log(response)
    dispatch(actions.setEvents(response));
}
export const getOrganizers = (): ThunkType => async (dispatch) => {
    const response = await httpRequests.getOrganizers();
    console.log(response)
    dispatch(actions.setOrganizers(response));
}

type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>


export default eventsReducer;
