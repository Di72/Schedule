export interface EventsType {
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
}

export interface OrganizersType {
  name: string;
  id: string;
}

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
  // eslint-disable-next-line @typescript-eslint/ban-types
  requestEvent: Function;
  id: string;
}

export type InitialStateType = {
  events: EventsType[];
  event: null | EventsType;
  organizers: OrganizersType[];
  editStatus: boolean;
  timeZone: string;
  postEvent: boolean;
};

export interface ITime {
  [x: string]: number;
  days: number;
  hours: number;
  minutes: number;
}

export interface IModalProps {
  data: ICourseOverview;
  okClickHandler: (event: React.MouseEvent<HTMLElement>) => void;
  cancelClickHandler: (event: React.MouseEvent<HTMLElement>) => void;
  visible: boolean;
}

export type IFieldOfEventsType =
  | 'name'
  | 'description'
  | 'descriptionUrl'
  | 'comment'
  | 'place'
  | 'type'
  | 'timeZone'
  | 'dateTime'
  | 'deadline'
  | 'id';

export interface ICalendarContainerProps {
  data: { events: EventsType[] };
}

export interface ICalendarContainer {
  ({ data: { events } }: ICalendarContainerProps): JSX.Element;
}
