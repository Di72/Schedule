import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/store';
import { getEvents, getOrganizers } from '../../redux/events-reducer';
import { Schedule } from './Table';

export const TableContainer = (props: any) => {
	// @ts-ignore
	useEffect(() => {
		props.requestOrganizers();
		props.requestEvents()
	  }, [])
	return (<>
		{props.data.events===undefined ? <h1>Подождите...</h1> : <Schedule data={props.data} requestEvents={props.requestEvents} requestOrganizers={props.requestOrganizers} />}
		
	</>);
};

const mapStateToProps = (state: AppStateType) => {
	return {
		data: state.eventsReducer
	};
};

export default connect(mapStateToProps, { requestEvents: getEvents, requestOrganizers: getOrganizers })(TableContainer);
