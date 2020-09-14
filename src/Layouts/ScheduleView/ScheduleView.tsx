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
// import { DUMMY_DATA } from '../TaskCard/TaskCard';
import TaskPage from '../TaskPage/TaskPage';
const DUMMY_DATA = {
  description: `
  Курс состоит из нескольких крупных модулей, 
  каждый из которых содержит короткие видео и тесты. 
  Задача тестов - проверить, насколько хорошо стала понятна тема. 
  Тесты можно проходить неограниченное количество раз, более того,
  во многих из них есть пояснения к неправильным ответам.
  Этот курс максимально гибкий: нет дедлайнов, 
  нет возможности "завалить" тест, 
  можно проходить обучение в удобное время в удобном месте.`,
  goal: "Цель курса - ознакомиться с основными технологиями и инструментами, используемыми в инженерной работе.",
  agenda: ['Железо компьютера',
    'Двоичная система счисления',
    'Операционные системы',
    'Типы данных и алгоритмы',
    'Компьютерные сети',
    'Инструменты повышения производительности'],
  teachers: [{
    firstName: 'Ricardo',
    secondName: 'Milos',
    company: 'Hot guys GMBH',
    photo: 'https://24smi.org/public/media/celebrity/2020/03/17/ndyuq11dpxep-rikardo-milos.jpg'
  }],
}


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
				<Header data={props.data} timeZone={props.timeZone} editStatus={props.editStatus} />
				<Switch>
					<Route path='/' exact={true}
						render={() => <ScheduleTable data={props.data} />} />
					<Route path='/list/' exact={true}
						render={() => <ScheduleList data={props.data} />} />
					<Route path='/calendar'
						render={() => <CalendarContainer data={props.data} />} />
					<Route path='/list/:id' render={({ match }) => {
						const { id } = match.params;
						return (
							<TaskPage {...DUMMY_DATA} id={id} />
						)
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

export default connect(mapStateToProps, { requestEvents: getEvents, requestOrganizers: getOrganizers, editStatus: actions.editStatus, timeZone: actions.setTimeZone })(ScheduleView);
