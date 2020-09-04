import axios from 'axios';

export const instance = axios.create({
	baseURL: 'https://rs-react-schedule.firebaseapp.com/api/team/53/'
});

export const httpRequests = {
	getEvents: () => {
		instance
			.get('events')
			.then(function(response: any) {
				console.log(response);
			})
			.catch(function(error) {
				console.log(error);
			});
	},
	getEvent: (id: string) => {
		instance
			.get(`event/${id}`)
			.then(function(response: any) {
				console.log(response, 'get event returned');
			})
			.catch(function(error) {
				console.log(error);
			});
	},
	postEvent: (data: any) => {
		instance
			.post('event', data)
			.then(function(response) {
				console.log(response, 'post status');
			})
			.catch(function(error) {
				console.log(error);
			});
	},
	putEvent: (data: any, eventId: string) => {
		instance.put(`event/${eventId}`, data);
	},
	deleteEvent: (id: string) => {
		instance.delete(`event/${id}`);
	},

	getOrganizers: () => {
		instance
			.get('organizers')
			.then(function(response: any) {
				console.log(response);
			})
			.catch(function(error) {
				console.log(error);
			});
	},
	getOrganizer: (id: string) => {
		instance
			.get(`organizer/${id}`)
			.then(function(response: any) {
				console.log(response, 'get organizer returned');
			})
			.catch(function(error) {
				console.log(error);
			});
	},
	postOrganizer: (data: any) => {
		instance
			.post('organizer', data)
			.then(function(response) {
				console.log(response, 'post status');
			})
			.catch(function(error) {
				console.log(error);
			});
	},
	putOrganizer: (data: any, organizerId: string) => {
		instance.put(`organizer/${organizerId}`, data);
	},
	deleteOrganizer: (id: string) => {
		instance.delete(`organizer/${id}`);
	}
};
