import styled from 'styled-components';

const S = {};

S.Container = styled.div`
  padding: 14px 16px;
  position: relative;
  z-index: 1;
  background-color: #F2F2F2;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  top: -18px;
`

S.Title = styled.h4`
  font-size: 16px;
  font-weight: 500;
  color: #66615C;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
`

S.AddButton = styled.button`
  border: none;
  background: none;
  color: #FFAD55;
  cursor: pointer;
  display: flex;
  align-items: center;

  span {
    margin-left: 8px;
    font-size: 14px;
  }
`

S.Empty = styled.div`
  text-align: center;
  padding: 60px;
  font-weight: 500;

  span {
    display: block;

    &:last-of-type {
      margin-top: 14px;
    }
  }
`

S.List = styled.ul`
  list-style: none;
  padding: 16px 0;
`
S.ListItem = styled.li`
  display: flex;
  flex-flow: row wrap;
  align-items: center;

  &:not(:last-of-type) {
    padding: 0 0 10px;
  }

  span {
    &:last-of-type {
      margin-left: 8px;
      line-height: 24px;
    }
  }
`

export default S;
