/* eslint-disable @typescript-eslint/ban-types */
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
  feedback?: boolean;
  InputImg?: string;
  InputVideo?: string;
  InputFeedbackEvent?: Array<string>;
  InputName1?: string;
  InputContent1?: string;
  InputName2?: string;
  InputContent2?: string;
  InputName3?: string;
  InputContent3?: string;
  InputName4?: string;
  InputContent4?: string;
  InputName5?: string;
  InputContent5?: string;
  InputName6?: string;
  InputContent6?: string;
  InputName7?: string;
  InputContent7?: string;
  InputName8?: string;
  InputContent8?: string;
  InputName9?: string;
  InputContent9?: string;
  InputName10?: string;
  InputContent10?: string;
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

export interface ITaskCardProps {
  event: EventsType;
  currentTimeZone: string;
}

export interface IHeader {
  data: InitialStateType;
  editStatus: Function;
  timeZone: Function;
}