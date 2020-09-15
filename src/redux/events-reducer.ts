import { httpRequests } from "./../api/api";
import { EventsType, OrganizersType } from "../types/types";
import { InferActionsTypes, BaseThunkType } from "./store";

let initialState = {
  events: [] as Array<EventsType>,
  event: null as null | EventsType,
  organizers: [] as Array<OrganizersType>,
  editStatus: false as boolean,
  timeZone: "Europe/Moscow" as string,
};

const eventsReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "SN/SET_EVENTS": {
      const response = action.response.map((item) => {
        const time = item.dateTime.split("/");
        const newTime = new Date(`${time[1]}-${time[0]}-${time[2]}`);
        item.dateTime = `${newTime.getFullYear()}-${('0' + (newTime.getMonth() + 1)).slice(-2)}-${newTime.getDate()}`;
        return item;
      });

      return {
        ...state,
        events: response.sort(
          (a, b) =>
            new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
        ),
      };
    }
    case "SN/SET_ORGANIZERS": {
      return { ...state, organizers: action.response };
    }
    case "SN/EDIT_TOGGLE": {
      if (state.editStatus === false) {
        return { ...state, editStatus: true };
      } else if (state.editStatus === true) {
        return { ...state, editStatus: false };
      } else {
        return {
          ...state,
        };
      }
    }
    case "SN/SET_TIMEZONE": {
      return { ...state, timeZone: action.timeZone };
    }
    case "SN/SET_EVENT": {
      return { ...state, event: action.response };
    }
    default:
      return state;
  }
};

export const actions = {
  setEvents: (response: Array<EventsType>) =>
    ({ type: "SN/SET_EVENTS", response } as const),
  setOrganizers: (response: Array<OrganizersType>) =>
    ({ type: "SN/SET_ORGANIZERS", response } as const),
  editStatus: () => ({ type: "SN/EDIT_TOGGLE" } as const),
  setTimeZone: (timeZone: string) =>
    ({ type: "SN/SET_TIMEZONE", timeZone } as const),
  setEvent: (response: EventsType) =>
    ({ type: "SN/SET_EVENT", response } as const),
};

export const getEvents = (): ThunkType => async (dispatch) => {
  const response = await httpRequests.getEvents();
  console.log(response);
  dispatch(actions.setEvents(response));
};

export const getOrganizers = (): ThunkType => async (dispatch) => {
  const response = await httpRequests.getOrganizers();
  console.log(response);
  dispatch(actions.setOrganizers(response));
};

export const getEvent = (id: string): ThunkType => async (dispatch) => {
  const response = await httpRequests.getEvent(id);
  dispatch(actions.setEvent(response));
};

type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes>;

export default eventsReducer;
