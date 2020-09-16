import { AppStateType } from "../redux/store";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";

export type EventsType = {
  name: string;
  description: string;
  descriptionUrl: string;
  comment: string;
  place: string;
  type: string;
  timeZone: string;
  dateTime: string;
  deadline: string;
  id: string;
};

export type OrganizersType = {
  name: string;
  id: string;
};

export interface IInitialState {
  events: EventsType[];
  organizers: OrganizersType[];
}

export interface ICourseOverview {
  [string: string]: any;
  description: string;
  goal: string;
  agenda: string[];
  teachers: CourseTeam[];
}

export interface CourseTeam {
  firstName: string;
  secondName: string;
  company: string;
  photo: string;
}

export interface ITaskPage extends ICourseOverview {
  requestEvent: Function;
  id: string;
}

export type BaseThunkType<
  A extends Action = Action,
  R = Promise<void>
> = ThunkAction<R, AppStateType, unknown, A>;

export type InitialStateType = {
  events: EventsType[];
  event: EventsType;
  organizers: OrganizersType[];
  editStatus: boolean;
  timeZone: string;
  postEvent: boolean;
  mock: boolean
};
