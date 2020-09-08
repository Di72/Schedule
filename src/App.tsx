import React from 'react';
import { Header } from './Layouts/Header/Header';
import './App.less';
import { ScheduleList } from './Layouts/Schedule-list';
import { Schedule } from './Layouts/Table/Table';
import store from './redux/store';
import { Provider } from 'react-redux';

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<Header />
			<Schedule />
			<ScheduleList />
		</Provider>
	);
};

export default App;
