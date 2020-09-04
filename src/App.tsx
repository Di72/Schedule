import React, { useEffect } from 'react';
import { Header } from './Layots/Header/Header';
import './App.css'
import {Schedule} from './Layots/Schedule/Schedule';
import { httpRequests } from './api/ts';

function App() {
	useEffect(() => {
		httpRequests.getEvents();
	}, [])

	useEffect(() => {
		httpRequests.getEvent('undefined');
	}, [])


	useEffect(() => {
		httpRequests.postEvent({orientation: "very gay"});
	}, [])

	useEffect(() => {
		httpRequests. putEvent({state: 'emergency25626236'}, 'undefined');
	}, [])

	return <>
	<Header />
	<Schedule />
	</>;
}

export default App;
