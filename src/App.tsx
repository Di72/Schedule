import React from 'react';
import './App.less';
import ScheduleView from './Layouts/ScheduleView/ScheduleView';
import store from './redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './Layouts/Header/Header';

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Provider store={store}>
				<Header />
				<ScheduleView />
			</Provider>
		</BrowserRouter>
	);
};

export default App;
