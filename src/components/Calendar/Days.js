import React, { memo } from 'react';
import styled from 'styled-components';

import Grid from '../Grid';

const DayContainer = styled.div`
  text-align: center;
  cursor: pointer;
`

const Day = styled.div`
  padding: 14px 0;
  max-width: 100%;
  background-color: ${props => props.isCurrentDate ? "#F2F2F2" : ''};
  border-radius: 9px;
  color: ${props => props.isCurrentDate ? "#66615C" : '#67615A'};
  font-weight: ${props => props.isCurrentDate ? "500" : ''};
`

const Ball = styled.div`
  width: 8px;
  height: 8px;
  margin: 3px auto;
  border-radius: 100%;
  background-color: #FFAD55;
`

const Days = ({ data, setActivityResumeDay }) => {
  return data.map((item, index) => (
    <Grid.Item key={`day-${index}`}>
      <DayContainer onClick={() => setActivityResumeDay(item)}>
        <Day isCurrentDate={item.isCurrentDate}>
          {item.value}
        </Day>
        {item.logsOfDay.length > 0 && (
          <Ball />
        )}
      </DayContainer>
    </Grid.Item >
  ))
}

export default memo(Days);
