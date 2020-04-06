import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import * as dateFns from 'date-fns';

import Header from './components/Header';
import Calendar from './components/Calendar';
import Grid from './components/Grid';
import Box from './components/Box';
import ActivityResume from './components/ActivityResume';

const CalendarHeader = styled.div`
  border-bottom: 1px solid #F2F2F2;
`

const CalendarHeaderMonth = styled.div`
  width: 100%;
  text-align: center;
  font-weight: 500;
  height: 100%;
  font-size: 14px;
  text-transform: uppercase;
`

const CalendarHeaderButton = styled.button`
  max-width: 40px;
  height: 40px;
  border-radius: 14px;
  background-color: #F2F2F2;
  display: block;
  width: 100%;
  text-align: center;
  border: 0;
  outline: none;
  color: #66615C;
`

const buildDayCells = (selectedDate) => {
  const currentDate = new Date();

  const monthStart = dateFns.startOfMonth(selectedDate);
  const monthEnd = dateFns.endOfMonth(monthStart);
  const startDayOfWeek = monthStart.getDay();

  const logsOfMonth = JSON.parse(window.localStorage.getItem('logs')).filter(time => time >= monthStart.getTime() && time <= monthEnd.getTime())

  const emptyDaysOfWeek = [...Array(startDayOfWeek)].map(() => ({
    value: '',
    logsOfDay: [],
    isCurrentDate: false
  }));

  const days = [...Array(monthEnd.getDate()).keys()].map(index => {
    const day = ++index;
    const dayStartTimestamp = new Date(monthStart.getFullYear(), monthStart.getMonth(), day).getTime();
    const dayEndTimestamp = new Date(monthStart.getFullYear(), monthStart.getMonth(), day, 23, 59, 59).getTime();

    const formatHour = date => dateFns.format(date, 'HH:mm:ss');

    const logsOfDay = logsOfMonth
      .filter(time => time >= dayStartTimestamp && time <= dayEndTimestamp)
      .map(formatHour)

    return {
      value: day,
      timestamp: dayStartTimestamp,
      dateFormatted: dateFns.format(dayStartTimestamp, 'LLLL d, yyyy'),
      isCurrentDate: currentDate.getDate() === day && monthStart.getMonth() === currentDate.getMonth(),
      logsOfDay
    }
  });

  return [...emptyDaysOfWeek, ...days];
}

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dayCells, setDayCells] = useState([]);
  const [activityResume, setActivityResume] = useState(null);

  useState(() => {
    if (window.localStorage.getItem('logs') === null) {
      window.localStorage.setItem('logs', JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    setDayCells(buildDayCells(selectedDate));
  }, [selectedDate]);

  useEffect(() => {
    if (activityResume !== null) {
      const newActivityResume = dayCells.find(item => item.dateFormatted === activityResume.dateFormatted);

      setActivityResume(newActivityResume || activityResume);
    }
  }, [activityResume, dayCells])

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const prevMonth = useCallback(() => {
    setSelectedDate(dateFns.subMonths(selectedDate, 1));
  }, [selectedDate]);

  const nextMonth = useCallback(() => {
    setSelectedDate(dateFns.addMonths(selectedDate, 1));
  }, [selectedDate]);

  const setActivityResumeDay = useCallback((data) => {
    setActivityResume(data);
  }, []);

  const addActivity = useCallback((timestamp) => {
    const currentTime = new Date();

    const time = new Date(timestamp)
      .setHours(currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds())

    const allActivities = JSON.parse(window.localStorage.getItem('logs'));

    window.localStorage.setItem('logs', JSON.stringify([...allActivities, time]));

    setDayCells(buildDayCells(selectedDate));
  }, [selectedDate]);

  return (
    <>
      <Header />

      <Calendar>
        <CalendarHeader>
          <Calendar.Container>
            <Box>
              <CalendarHeaderButton aria-label="Prev month" onClick={prevMonth}>
                <MdKeyboardArrowLeft size={16} />
              </CalendarHeaderButton>
              <CalendarHeaderMonth>
                {dateFns.format(selectedDate, 'MMMM yyyy')}
              </CalendarHeaderMonth>
              <CalendarHeaderButton aria-label="Next month" onClick={nextMonth}>
                <MdKeyboardArrowRight size={16} />
              </CalendarHeaderButton>
            </Box>
          </Calendar.Container>
        </CalendarHeader>

        <Calendar.Container>
          <Grid repeat={7}>
            <Calendar.DaysOfWeek data={daysOfWeek} />

            <Calendar.Days data={dayCells} setActivityResumeDay={setActivityResumeDay} />
          </Grid>
        </Calendar.Container>
      </Calendar>

      <ActivityResume data={activityResume} addActivity={addActivity} />
    </>
  )
}

export default App;
