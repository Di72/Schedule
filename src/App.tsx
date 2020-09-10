import React from 'react';
import './App.less';
import ScheduleView from './Layouts/ScheduleView/ScheduleView';
import store from './redux/store';
import { Provider } from 'react-redux';

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<ScheduleView />
		</Provider>
	);
};

export default App;
