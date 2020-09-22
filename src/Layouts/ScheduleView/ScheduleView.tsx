import { Layout, Spin } from 'antd';
import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { actions } from '../../redux/actions';
import * as requests from '../../redux/requests';
import { isNewTaskPostedSelector, setEventsAndOrganizerSelector } from '../../redux/selectors';
import { AppStateType } from '../../redux/store';
import CalendarContainer from '../Calendar/CalendarContainer';
import { Header } from '../Header/Header';
import { ScheduleList } from '../List';
import { ScheduleTable } from '../Table/ScheduleTable';
import TaskPage from '../TaskPage';

const ScheduleView = (props: any) => {
  const isNewTaskCreated = useSelector(isNewTaskPostedSelector);
  const { data, timeZone, editStatus, requestEvents, putEvent, deleteEvent } = props;

  useEffect(() => {
    props.requestOrganizers();
    props.requestEvents();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNewTaskCreated]);

  if (!data.events[0])
    return (
      <Layout
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'transparent',
        }}
      >
        <Spin size="large" tip="Loading..." />
      </Layout>
    );

  return (
    <Router>
      <Layout style={{ margin: '16px', backgroundColor: 'transparent' }}>
        <Header data={data} timeZone={timeZone} editStatus={editStatus} />
        <Switch>
          <Route path="/" exact={true}>
            <ScheduleTable data={data} requestEvents={requestEvents} putEvent={putEvent} deleteEvent={deleteEvent} />
          </Route>
          <Route path="/list/" exact={true}>
            <ScheduleList data={data} timeZone={data.timeZone} />
          </Route>
          <Route path="/calendar">
            <CalendarContainer data={data} />
          </Route>
          <Route
            path="/list/:id"
            render={({ match }) => {
              const { id } = match.params;
              return <TaskPage id={id} />;
            }}
          />
        </Switch>
      </Layout>
    </Router>
  );
};

const mapStateToProps = (state: AppStateType) => {
  return {
    data: setEventsAndOrganizerSelector(state),
  };
};

const mapDispatchToProps = {
  putEvent: requests.putEvent,
  deleteEvent: requests.deleteEvent,
  requestEvents: requests.getEvents,
  requestOrganizers: requests.getOrganizers,
  editStatus: actions.editStatus,
  timeZone: actions.setTimeZone,
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleView);
