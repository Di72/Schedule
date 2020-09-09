import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/store';
import { getEvents, getOrganizers, actions } from '../../redux/events-reducer';
import { ScheduleTable } from '../Table/ScheduleTable';
import { setEventsAndOrganizerSelector } from '../../redux/selectors';
import { ScheduleList } from '../Schedule-list';
import CalendarContainer from '../Calendar/CalendarContainer';
import { Route } from 'react-router-dom';
import { Header } from '../Header/Header';


export const ScheduleView = (props: any) => {
	useEffect(() => {
		props.requestOrganizers();
		props.requestEvents();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const schedule = (<>
		<Header data={props.data} />
		    <Route path='/table'
		render={ () => <ScheduleTable data={props.data} /> }/>
	 		<Route path='/list'
		render={ () => <ScheduleList /> }/>
	 		<Route path='/calendar'
		render={ () => <CalendarContainer data={props.data} /> }/>
			
			
			
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

export default connect(mapStateToProps, { requestEvents: getEvents, requestOrganizers: getOrganizers, editStatus: actions.editStatus})(ScheduleView);
