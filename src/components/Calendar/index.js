import React from 'react';

import Container from './Container';
import DaysOfWeek from './DaysOfWeek';
import Days from './Days';
import S from './styles';

const Calendar = ({ children }) => (
  <S.Wrapper>{children}</S.Wrapper>
);

Calendar.Container = Container;
Calendar.DaysOfWeek = DaysOfWeek;
Calendar.Days = Days;

export default Calendar;