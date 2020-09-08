import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/store';
import { getEvents, getOrganizers } from '../../redux/events-reducer';
import { ScheduleTable } from '../Table/ScheduleTable';
import { setEventsAndOrganizerSelector } from '../../redux/selectors';
import { ScheduleList } from '../Schedule-list';
import CalendarContainer from '../Calendar/CalendarContainer';
import { Layout } from 'antd';

export const ScheduleView = (props: any) => {
	useEffect(() => {
		props.requestOrganizers();
		props.requestEvents();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	if (!props.data.events[0])
		return (
			<Layout style={{ display: "flex", alignItems: "center", backgroundColor: "transparent" }}>
				<h3>Loading...</h3>
			</ Layout>
		)

	return (
		<Layout style={{ margin: '0 16px', backgroundColor: "transparent" }}>
			<ScheduleTable data={props.data} />
			<ScheduleList data={props.data} />
			<CalendarContainer data={props.data} />
		</ Layout>
	);
};

const mapStateToProps = (state: AppStateType) => {
	return {
		data: setEventsAndOrganizerSelector(state)
	};
};

export default connect(mapStateToProps, { requestEvents: getEvents, requestOrganizers: getOrganizers })(ScheduleView);
