import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://rs-react-schedule.firebaseapp.com/api/team/53/',
});

export const httpRequests = {
  getEvents: () => {
    return instance
      .get('events')
      .then((res) => res.data.data)
      .catch(function (error) {
        console.log(error);
      });
  },
  getEvent: (id: string) => {
    return instance
      .get(`event/${id}`)
      .then((res) => res.data)
      .catch(function (error) {
        console.log(error);
      });
  },
  postEvent: (data: any) => {
    return instance
      .post('event', data)
      .then((res) => res.data)
      .catch(function (error) {
        console.log(error);
      });
  },
  putEvent: (data: any, eventId: string) => {
    return instance
      .put(`event/${eventId}`, data)
      .then((res) => res.data.data)
      .catch(function (error) {
        console.log(error);
      });
  },
  deleteEvent: (id: string) => {
    return instance
      .delete(`event/${id}`)
      .then(function (response) {
        console.log(response, 'delete status');
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  getOrganizers: () => {
    return instance
      .get('organizers')
      .then((res) => res.data.data)
      .catch(function (error) {
        console.log(error);
      });
  },
  getOrganizer: (id: string) => {
    return instance
      .get(`organizer/${id}`)
      .then((res) => res.data.data)
      .catch(function (error) {
        console.log(error);
      });
  },
  postOrganizer: (data: any) => {
    return instance
      .post('organizer', data)
      .then((res) => res.data.data)
      .catch(function (error) {
        console.log(error);
      });
  },
  putOrganizer: (data: any, organizerId: string) => {
    return instance
      .put(`organizer/${organizerId}`, data)
      .then((res) => res.data.data)
      .catch(function (error) {
        console.log(error);
      });
  },
  deleteOrganizer: (id: string) => {
    return instance
      .delete(`organizer/${id}`)
      .then((res) => res.data.data)
      .catch(function (error) {
        console.log(error);
      });
  },
};
