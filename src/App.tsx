import React from 'react';
import './App.less';
import ScheduleView from './Layouts/ScheduleView/ScheduleView';
import store from './redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

const App: React.FC = () => {
	return (
		<Router>
			<Provider store={store}>
				<ScheduleView />
			</Provider>
		</Router>
	);
};

export default App;
