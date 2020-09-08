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

export interface ScheduleDataTemplate {
  Blocks?: string;
  Time?: string;
  Result?: string;
  Notate?: string;
}

export interface ScheduleDataTertiary extends ScheduleDataTemplate {
  Task: string;
}

export interface ScheduleDataSecondary extends ScheduleDataTemplate {
  Task?: string;
  Include?: ScheduleDataTertiary[];
}

export interface ScheduleData extends ScheduleDataTemplate {
  Task: string;
  Include?: ScheduleDataSecondary[];
}
