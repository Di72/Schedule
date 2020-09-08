import React from 'react';
import { Header } from './Layouts/Header/Header';
import './App.less';
import ScheduleView from './Layouts/ScheduleView/ScheduleView';
import store from './redux/store';
import { Provider } from 'react-redux';

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<Header />
			<ScheduleView />
		</Provider>
	);
};

export default App;
