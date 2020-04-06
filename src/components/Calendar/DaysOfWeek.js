import React, { memo } from 'react';
import styled from 'styled-components';

import Grid from '../Grid';

const Item = styled.div`
  font-size: 12px;
  color: #333;
  font-weight: 500;
  text-align: center;
  padding-bottom: 14px;
`;

const DaysOfWeek = ({ data }) => {
  return data.map((item, index) => (
    <Grid.Item key={`day-week-${index}`}>
      <Item>
        {item}
      </Item>
    </Grid.Item>
  ))
};

export default memo(DaysOfWeek);