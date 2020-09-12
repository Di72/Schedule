import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/store';
import { getEvents, getOrganizers, actions, updateEvent, getEvent } from '../../redux/events-reducer';
import { ScheduleTable } from '../Table/ScheduleTable';
import { setEventsAndOrganizerSelector } from '../../redux/selectors';
import { ScheduleList } from '../Schedule-list';
import CalendarContainer from '../Calendar/CalendarContainer';
import { Route } from 'react-router-dom';
import { Layout } from 'antd';
import { Header } from '../Header/Header';

export const ScheduleView = (props: any) => {
	useEffect(() => {
		props.requestOrganizers();
		props.requestEvents();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	if (!props.data.events[0])
		return (
			<Layout style={{ display: 'flex', alignItems: 'center', backgroundColor: 'transparent' }}>
				<h3>Loading...</h3>
			</Layout>
		);
	return (
		<Layout style={{ margin: '16px', backgroundColor: 'transparent' }}>
			<Header data={props.data} editStatus={props.editStatus} />
			<Route
				path="/"
				exact
				render={() => <ScheduleTable data={props.data} requestEvent={props.requestEvent} />}
			/>
			<Route path="/list" render={() => <ScheduleList data={props.data} />} />
			<Route path="/calendar" render={() => <CalendarContainer data={props.data} />} />
		</Layout>
	);
};

const mapStateToProps = (state: AppStateType) => {
	return {
		data: setEventsAndOrganizerSelector(state)
	};
};

export default connect(mapStateToProps, {
	requestEvents: getEvents,
	requestEvent: getEvent,
	requestOrganizers: getOrganizers,
	updateEvent,
	getEvent,
	editStatus: actions.editStatus
})(ScheduleView);
