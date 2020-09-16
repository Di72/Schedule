import { httpRequests } from "./../api/api";
import { BaseThunkType, EventsType } from '../types/types';
import { actions, ActionsTypes } from './actions';

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

export const putEvent = (data: any, id: string): ThunkType => async (dispatch) => {
  await httpRequests.putEvent(data, id);
  dispatch(actions.putEvent());
};

export const postEvent = (data:EventsType):ThunkType => async (dispatch) => {
  await httpRequests.postEvent(data);
  dispatch(actions.postEvent());
}

export type ThunkType = BaseThunkType<ActionsTypes>;