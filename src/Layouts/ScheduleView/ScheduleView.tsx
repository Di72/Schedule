import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/store';
import { getEvents, getOrganizers, actions } from '../../redux/events-reducer';
import { ScheduleTable } from '../Table/ScheduleTable';
import { setEventsAndOrganizerSelector } from '../../redux/selectors';
import { ScheduleList } from '../List';
import CalendarContainer from '../Calendar/CalendarContainer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
			<Layout style={{ display: "flex", alignItems: "center", backgroundColor: "transparent" }}>
				<h3>Loading...</h3>
			</ Layout>
		)
	return (
		<Router>
			<Layout style={{ margin: "16px", backgroundColor: "transparent" }}>
				<Header data={props.data} editStatus={props.editStatus} />
				<Switch>
					<Route path='/' exact={true}
						render={() => <ScheduleTable data={props.data} />} />
					<Route path='/list/' exact={true}
						render={() => <ScheduleList data={props.data} />} />
					<Route path='/calendar'
						render={() => <CalendarContainer data={props.data} />} />
					<Route path='/list/:id' render={({ match }) => {
						const { id } = match.params;
						return <h1>{id}</h1>
					}}></Route>
				</Switch>
			</ Layout>
		</Router>
	);
};

const mapStateToProps = (state: AppStateType) => {
	return {
		data: setEventsAndOrganizerSelector(state)
	};
};

export default connect(mapStateToProps, { requestEvents: getEvents, requestOrganizers: getOrganizers, editStatus: actions.editStatus })(ScheduleView);
