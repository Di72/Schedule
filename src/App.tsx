import React from 'react';
import { Header } from './Layouts/Header/Header';
import './App.less';
import Table from './Layouts/Table/TableContainer';
import store from './redux/store';
import { Provider } from 'react-redux';

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<Header />
			<Table />
		</Provider>
	);
};

export default App;
