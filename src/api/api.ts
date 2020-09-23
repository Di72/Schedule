/* eslint-disable no-console */
import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://rs-react-schedule.firebaseapp.com/api/team/53/',
});

export const httpRequests = {
  getEvents: (): Promise<any> => {
    return instance
      .get('events')
      .then((res) => res.data.data)
      .catch((error) => {
        console.log(error);
      });
  },
  getEvent: (id: string): Promise<any> => {
    return instance
      .get(`event/${id}`)
      .then((res) => res.data)
      .catch((error) => {
        console.log(error);
      });
  },
  postEvent: (data: any): Promise<any> => {
    return instance
      .post('event', data)
      .then((res) => res.data)
      .catch((error) => {
        console.log(error);
      });
  },
  putEvent: (data: any, eventId: string): Promise<any> => {
    return instance
      .put(`event/${eventId}`, data)
      .then((res) => res.data.data)
      .catch((error) => {
        console.log(error);
      });
  },
  deleteEvent: (id: string): Promise<any> => {
    return instance
      .delete(`event/${id}`)
      .then((response) => {
        console.log(response, 'delete status');
      })
      .catch((error) => {
        console.log(error);
      });
  },

  getOrganizers: (): Promise<any> => {
    return instance
      .get('organizers')
      .then((res) => res.data.data)
      .catch((error) => {
        console.log(error);
      });
  },
  getOrganizer: (id: string): Promise<any> => {
    return instance
      .get(`organizer/${id}`)
      .then((res) => res.data.data)
      .catch((error) => {
        console.log(error);
      });
  },
  postOrganizer: (data: { name: string }): Promise<any> => {
    return instance
      .post('organizer', data)
      .then((res) => res.data.data)
      .catch((error) => {
        console.log(error);
      });
  },
  putOrganizer: (data: { name: string }, organizerId: string): Promise<any> => {
    return instance
      .put(`organizer/${organizerId}`, data)
      .then((res) => res.data.data)
      .catch((error) => {
        console.log(error);
      });
  },
  deleteOrganizer: (id: string): Promise<any> => {
    return instance
      .delete(`organizer/${id}`)
      .then((res) => res.data.data)
      .catch((error) => {
        console.log(error);
      });
  },
};
