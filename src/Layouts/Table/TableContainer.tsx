import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/store';
import { getEvents, getOrganizers } from '../../redux/events-reducer';
import { Schedule } from './Table';
import { setEventsAndOrganizer } from '../../Selectors/selectors';

export const TableContainer = (props: any) => {
	useEffect(() => {
		props.requestOrganizers();
		props.requestEvents();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const schedule = <Schedule data={props.data} requestEvents={props.requestEvents} requestOrganizers={props.requestOrganizers} />

	const content = props.data.events[0] === undefined ? <h1>Подождите...</h1> : schedule;

	return content;
};

const mapStateToProps = (state: AppStateType) => {
	return {
		data: setEventsAndOrganizer(state)
	};
};

export default connect(mapStateToProps, { requestEvents: getEvents, requestOrganizers: getOrganizers })(TableContainer);
