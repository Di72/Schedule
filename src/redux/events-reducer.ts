import { EventsType, InitialStateType } from "../types/types";
import { ActionsTypes } from "./actions";

let initialState: InitialStateType = {
  events: [],
  event: {} as EventsType,
  organizers: [],
  editStatus: false,
  timeZone: "Europe/Moscow",
  postEvent: false,
};

const eventsReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "SN/SET_EVENTS": {
      return { ...state, events: action.response };
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
