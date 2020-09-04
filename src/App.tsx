import React, { useEffect } from 'react';
import { Header } from './Layots/Header/Header';
import './App.css'
import {Schedule} from './Layots/Schedule/Schedule';
import { httpRequests } from './api/ts';

function App() {
	useEffect(() => {
		httpRequests.deleteEvent('undefined');
	}, [])

	return <>
	<Header />
	<Schedule />
	</>;
}

export default App;
