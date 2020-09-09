import React from 'react';
import './App.less';
import ScheduleView from './Layouts/ScheduleView/ScheduleView';
import store from './redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Provider store={store}>
				<ScheduleView />
			</Provider>
		</BrowserRouter>
	);
};

export default App;
