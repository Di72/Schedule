import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';

import { AppStateType } from '../../redux/store';
import { getEvents, getOrganizers, putEvent } from '../../redux/requests';
import { actions } from '../../redux/actions';
import { setEventsAndOrganizerSelector, isNewTaskPostedSelector } from '../../redux/selectors';

import { ScheduleTable } from '../Table/ScheduleTable';
import { Header } from '../Header/Header';
import TaskPage from '../TaskPage/TaskPage';
import { ScheduleList } from '../List';
import CalendarContainer from '../Calendar/CalendarContainer';
import { Layout, Spin } from 'antd';

export const ScheduleView = (props: any) => {
	const isNewTaskCreated = useSelector(isNewTaskPostedSelector);

	useEffect(
		() => {
			props.requestOrganizers();
			props.requestEvents();
			// eslint-disable-next-line react-hooks/exhaustive-deps
		},
		[ isNewTaskCreated ]
	);

	if (!props.data.events[0])
		return (
			<Layout style={{ display: 'flex', alignItems: 'center', backgroundColor: 'transparent' }}>
				<Spin size="large" tip="Loading..." />
			</Layout>
		);
	return (
		<Router>
			<Layout style={{ margin: '16px', backgroundColor: 'transparent' }}>
				<Header data={props.data} timeZone={props.timeZone} editStatus={props.editStatus} />
				<Switch>
					<Route
						path="/"
						exact={true}
						render={() => (
							<ScheduleTable
								data={props.data}
								requestEvents={props.requestEvents}
								putEvent={props.putEvent}
							/>
						)}
					/>
					<Route
						path="/list/"
						exact={true}
						render={() => <ScheduleList data={props.data} timeZone={props.data.timeZone} />}
					/>
					<Route path="/calendar" render={() => <CalendarContainer data={props.data} />} />
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
		data: setEventsAndOrganizerSelector(state)
	};
};

const mapDispatchToProps = {
	putEvent,
	requestEvents: getEvents,
	requestOrganizers: getOrganizers,
	editStatus: actions.editStatus,
	timeZone: actions.setTimeZone
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleView);
