import React, { useState, useEffect } from 'react'
import { Calendar, Badge } from 'antd';
import moment from 'moment';
import 'moment/locale/ru';
import { httpRequests } from '../../api/ts';
 
moment.locale('ru');

const events = [
  {
    "Name": "JS online resource\r\nhttps://ru.code-basics.com/languages/javascript",
    "Comment": "Решения всех заданий доступны после 20-минутной паузы. Для проверки самостоятельности решения заданий нужно посмотреть и послушать как студент решает пройденные им таски",
    "ID": "3",
    "dateTime": "12/14/20",
    "timeZone": "GMT +03",
    "Description": "Базовый курс JavaScript. Если проходить осмысленно, даст неплохое представление о языке и его возможностях.",
    "type": "js task",
    "Place": "online",
    "id": "1StuXWghUFefBrl1KMWz"
  },
  {
    "Description": "Базовый курс по html / css",
    "Place": "online",
    "type": "html/css task",
    "Name": "HTML/Css online resource \r\nhttps://ru.code-basics.com/languages/html\r\nhttps://ru.code-basics.com/languages/css",
    "dateTime": "12/13/20",
    "ID": "2",
    "Comment": "Решения всех заданий доступны после 20-минутной паузы. Для проверки самостоятельности решения заданий нужно посмотреть и послушать как студент решает пройденные им таски",
    "timeZone": "GMT +03",
    "Result": "На странице курса все темы отмечены галочками. Студент может пояснить решение некоторых заданий (на выбор ментора)",
    "Time\r\nTheory+Practice": "16h",
    "id": "F3aPFwAbJUotEw1ImlXr"
  },
  {
    "Time\r\nTheory+Practice": "0.5h",
    "ID": "4",
    "descriptionUrl": "https://htmlacademy.ru/blog/boost/tools/register-on-github-work-with-console",
    "Place": "online",
    "timeZone": "GMT +03",
    "Result": "Установлен Git\r\nСоздан github-аккаунт",
    "type": "git task",
    "Name": "Git & GitHub\r\n",
    "dateTime": "12/15/20",
    "Description": "Регистрация на Гитхабе",
    "id": "FwQLPFR9vwmuKryCzHlK"
  },
  {
    "timeZone": "GMT +03",
    "type": "basic task",
    "Time\r\nTheory+Practice": "16h",
    "Place": "online",
    "Description": "Пройти этот курс рекомендует EPAM. Из описания: Данный тренинг может быть хорошим стартом для дальнейшего изучения программирования и инженерной работы в IT сфере.",
    "Result": "На странице курса все темы отмечены галочками.\r\nСтудент может пояснить решение алгоритмов раздела Data Types and Algoritms задание Test - operators",
    "ID": "1",
    "dateTime": "12/12/20",
    "Name": "Computer Science Basics http://epa.ms/upskill-start",
    "Comment": "Курс проходится за полчаса кликами по кнопке Next и перебором вариантов ответа в тестах.",
    "id": "GCHKJAgzTOLc7FYKJ4qk"
  },
  {
    "dateTime": "12/16/20",
    "ID": "5",
    "descriptionUrl": "https://htmlacademy.ru/blog/boost/tools/useful-commands-for-working-with-git",
    "timeZone": "GMT +03",
    "type": "git task",
    "Place": "online",
    "Time\r\nTheory+Practice": "0.5h",
    "Description": "Полезные команды для работы с Git",
    "Result": "Создан репозиторий на гитхабе, создана ветка, добавлены файлы",
    "id": "QnppvT8R1gPHGhfUtdE9"
  }
]

export const CalendarContainer = () => {

  const dataTasks = events.reduce((acc:any, curr) => {
    const dateTask = Number(curr.dateTime.split('/')[1].split('/')[0]);
    return acc.set(dateTask, curr);
  }, new Map());
  
  const getListData = (value: moment.Moment) => {
    const data:any = []
    if(dataTasks.get(value.date())) data.push(dataTasks.get(value.date()));
    return data;
  }
  
  const dateCellRender = (value: moment.Moment) => {
    const listData = getListData(value);
    return <ul className="events">
            {listData.map((item:any) => (
              <li key={item.Description}>
                <Badge status='default' text={item.Description} />
              </li>
            ))}
          </ul> 
  }

  const onSelect = (value: moment.Moment) => {
    console.log(value.toDate());
  }

  return (
    <>
      <Calendar dateCellRender={dateCellRender}  onSelect={onSelect}/>
    </>
  )
}