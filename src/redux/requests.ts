import { httpRequests } from "./../api/api";
import { BaseThunkType } from '../types/types';
import { actions, ActionsTypes } from './actions';

export const getEvents = (): ThunkType => async (dispatch) => {
  const response = await httpRequests.getEvents();
  console.log(response);
  dispatch(actions.setEvents(response));
};

export const getOrganizers = (): ThunkType => async (dispatch) => {
  const response = await httpRequests.getOrganizers();
  console.log(response);
  dispatch(actions.setOrganizers(response));
};

export const getEvent = (id: string): ThunkType => async (dispatch) => {
  const response = await httpRequests.getEvent(id);
  dispatch(actions.setEvent(response));
};

export type ThunkType = BaseThunkType<ActionsTypes>;