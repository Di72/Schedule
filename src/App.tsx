import React from 'react';
import { Header } from './Layouts/Header/Header';
import './App.less';
import { Schedule } from './Layouts/Schedule/Schedule';
import { ScheduleList } from './Layouts/Schedule-list';

function App() {
	return (
		<>
			<Header />
			<Schedule />
			<ScheduleList />
		</>
	);
}

export default App;
