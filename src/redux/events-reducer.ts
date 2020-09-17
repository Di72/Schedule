import { EventsType, InitialStateType, OrganizersType } from "../types/types";
import { ActionsTypes } from "./actions";

let initialState: InitialStateType = {
  events: [],
  editStatus: false,
  timeZone: "Europe/Moscow",
  postEvent: false,
  event: null as null | EventsType,
  organizers: [] as Array<OrganizersType>,
};

const eventsReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "SN/SET_EVENTS": {
      return {
        ...state,
        events: action.response.sort(
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
    case "SN/SET_EVENT": {
      return { ...state, event: action.response };
    }
    case "SN/SET_TIMEZONE": {
      return { ...state, timeZone: action.timeZone };
    }
    case "SN/POST_EVENT": {
      return { ...state, postEvent: !state.postEvent };
    }
    default:
      return state;
  }
};

export default eventsReducer;
