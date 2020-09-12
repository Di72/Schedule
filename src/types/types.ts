export type EventsType = {
  name: string;
  description: string;
  descriptionUrl: string;
  comment: string;
  place: string;
  type: string;
  timeZone: string;
  dateTime: string;
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
