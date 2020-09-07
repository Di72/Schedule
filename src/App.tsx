import React from 'react';
import { Header } from './Layouts/Header/Header';
import './App.less';
import { Schedule } from './Layouts/Schedule/Schedule';
import { CalendarContainer } from './Layouts/Calendar/CalendarContainer';

function App() {
	return (
		<>
			<Header />
			{/* <Schedule /> */}
			<CalendarContainer/>
		</>
	);
}

export default App;
