import React from 'react';
import { Provider } from 'react-redux';
import './App.less';
import ScheduleView from './Layouts/ScheduleView/ScheduleView';
import store from './redux/store';


const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ScheduleView />
    </Provider>
  );
};

export default App;
