import styled from 'styled-components';

import Container from './Container';
import DaysOfWeek from './DaysOfWeek';
import Days from './Days';

const Calendar = styled.div`
  background: #fff;
  padding: 0 0 20px;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
`;

Calendar.Container = Container;
Calendar.DaysOfWeek = DaysOfWeek;
Calendar.Days = Days;

export default Calendar;