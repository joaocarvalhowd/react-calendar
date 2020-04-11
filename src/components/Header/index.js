import React from 'react';
import { ReactComponent as Logo } from '../../images/logo.svg';
import S from './styles';

const Header = () => (
  <S.Header>
    <Logo />
    <h1>
      Calendar
    </h1>
  </S.Header>
);

export default Header;
