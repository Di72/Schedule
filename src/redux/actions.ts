import { EventsType, OrganizersType } from '../types/types';

export const actions = {
  setEvents: (response: Array<EventsType>) => ({ type: 'SN/SET_EVENTS', response } as const),
  setOrganizers: (response: Array<OrganizersType>) => ({ type: 'SN/SET_ORGANIZERS', response } as const),
  editStatus: () => ({ type: 'SN/EDIT_TOGGLE' } as const),
  setTimeZone: (timeZone: string) => ({ type: 'SN/SET_TIMEZONE', timeZone } as const),
  setEvent: (response: EventsType) => ({ type: 'SN/SET_EVENT', response } as const),
  postEvent: () => ({ type: 'SN/POST_EVENT' } as const),
};

export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never;

export type ActionsTypes = InferActionsTypes<typeof actions>;
