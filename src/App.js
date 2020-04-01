import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import * as dateFns from 'date-fns';

const Calendar = styled.div`
  background: #fff;
`;

const CalendarContainer = styled.div`
  padding: 14px 16px;
`;

const Box = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`

const CalendarHeader = styled.div`
  border-bottom: 1px solid #B7B6BC;
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
  border-radius: 9px;
  background-color: #F2A026;
  display: block;
  width: 100%;
  text-align: center;
  border: 0;
  outline: none;
  color: #fff;
`

const CalendarDaysOfWeek = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const CalendarDaysOfWeekItem = styled.div`
  font-size: 12px;
  color: #333;
  font-weight: 500;
  text-align: center;
  padding-bottom: 14px;
`;

const CalendarDayCells = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const CalendarDayCell = styled.div`
  padding: 14px;
  text-align: center;
  background-color: ${props => props.isCurrentDate ? "#F2A026" : ''};
  border-radius: 9px;
  color: ${props => props.isCurrentDate ? "#fff" : '#000'};;
`

const buildDayCells = (selectedDate) => {
  const currentDate = new Date();

  const monthStart = dateFns.startOfMonth(selectedDate);
  const monthEnd = dateFns.endOfMonth(monthStart);
  const startDayOfWeek = monthStart.getDay();

  const emptyDaysOfWeek = [...Array(startDayOfWeek)].map(() => ({
    value: '',
    isCurrentDate: false
  }));

  const days = [...Array(monthEnd.getDate()).keys()].map(index => {
    const day = ++index;

    return {
      value: day,
      isCurrentDate: currentDate.getDate() === day && monthStart.getMonth() === currentDate.getMonth()
    }
  });

  return [...emptyDaysOfWeek, ...days];
}

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dayCells, setDayCells] = useState([]);

  useEffect(() => {
    setDayCells(buildDayCells(selectedDate));
  }, [selectedDate]);

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const prevMonth = () => {
    setSelectedDate(dateFns.subMonths(selectedDate, 1));
  };

  const nextMonth = () => {
    setSelectedDate(dateFns.addMonths(selectedDate, 1));
  };

  return (
    <Calendar>
      <CalendarHeader>
        <CalendarContainer>
          <Box>
            <CalendarHeaderButton onClick={prevMonth}>
              <MdKeyboardArrowLeft size={16} />
            </CalendarHeaderButton>
            <CalendarHeaderMonth>
              {dateFns.format(selectedDate, 'MMMM yyyy')}
            </CalendarHeaderMonth>
            <CalendarHeaderButton onClick={nextMonth}>
              <MdKeyboardArrowRight size={16} />
            </CalendarHeaderButton>
          </Box>
        </CalendarContainer>
      </CalendarHeader>

      <CalendarContainer>
        <CalendarDaysOfWeek>
          {daysOfWeek.map((item, index) => (
            <CalendarDaysOfWeekItem key={`day-week-${index}`}>
              {item}
            </CalendarDaysOfWeekItem>
          ))}
        </CalendarDaysOfWeek>
        <CalendarDayCells>
          {dayCells.map((item, index) => (
            <CalendarDayCell key={`day-${index}`} isCurrentDate={item.isCurrentDate}>{item.value}</CalendarDayCell>
          ))}
        </CalendarDayCells>
      </CalendarContainer>
    </Calendar>
  )
}

export default App;
