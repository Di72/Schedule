import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/store';
import { getEvents, getOrganizers } from '../../redux/events-reducer';
import { ScheduleTable } from '../Table/ScheduleTable';
import { setEventsAndOrganizerSelector } from '../../redux/selectors';
import { ScheduleList } from '../Schedule-list';
import CalendarContainer from '../Calendar/CalendarContainer';

export const ScheduleView = (props: any) => {
	useEffect(() => {
		props.requestOrganizers();
		props.requestEvents();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const schedule = (
		<>
			<ScheduleTable data={props.data} />
			<ScheduleList data={props.data} />
			<CalendarContainer data={props.data} />
		</>
	);

	const content = props.data.events[0] === undefined ? <h1>Подождите...</h1> : schedule;

	return content;
};

const mapStateToProps = (state: AppStateType) => {
	return {
		data: setEventsAndOrganizerSelector(state)
	};
};

export default connect(mapStateToProps, { requestEvents: getEvents, requestOrganizers: getOrganizers })(ScheduleView);
