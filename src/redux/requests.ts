import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { httpRequests } from '../api/api';
import { EventsType } from '../types/types';
import { actions, ActionsTypes } from './actions';
import { AppStateType } from './store';

export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>;
export type ThunkType = BaseThunkType<ActionsTypes>;

export const getEvents = (): ThunkType => async (dispatch) => {
  const response = await httpRequests.getEvents();
  dispatch(actions.setEvents(response));
};

export const getOrganizers = (): ThunkType => async (dispatch) => {
  const response = await httpRequests.getOrganizers();
  dispatch(actions.setOrganizers(response));
};

export const getEvent = (id: string): ThunkType => async (dispatch) => {
  const response = await httpRequests.getEvent(id);
  dispatch(actions.setEvent(response));
};

export const putEvent = (data: EventsType, id: string): ThunkType => async () => {
  await httpRequests.putEvent(data, id);
};
export const deleteEvent = (id: string): ThunkType => async () => {
  await httpRequests.deleteEvent(id);
};

export const postEvent = (data: EventsType): ThunkType => async (
  dispatch: (arg0: { readonly type: 'SN/POST_EVENT' }) => void
) => {
  await httpRequests.postEvent(data);
  dispatch(actions.postEvent());
  getEvents();
};
