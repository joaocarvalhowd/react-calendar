import styled from 'styled-components';

const S = {};

S.Header = styled.header`
  padding: 16px;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content:  center;

  svg {
    width: 35px;
    margin: 0 10px 0 0;
  }

  h1 {
    font-weight: 500;
    text-align: center;
    text-transform: uppercase;
    color: #fff;
    font-size: 24px;
    text-shadow: 1px 1px 1px #000;
  }
`;

export default S;
