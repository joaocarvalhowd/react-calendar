import styled from 'styled-components';
import Item from './Item';

const Grid = styled.div`
  display: grid;
  grid-template-columns: ${props => `repeat(${props.repeat}, 1fr)`};
`;

Grid.Item = Item;

export default Grid;