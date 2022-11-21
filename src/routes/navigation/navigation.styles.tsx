import styled from 'styled-components';

import { Link } from 'react-router-dom';

export const NavigationContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;

  @media screen and (max-width: 800px) {
    height: 60px;
    padding: 10px;
    margin-bottom: 20px;
  }
`;

export const LogoContainer = styled(Link)`
  padding-left: 15px;
  padding-top: 10px;

  .logo {
    width: 70%;
    height: 70%;
  }

  @media screen and (max-width: 800px) {
    .logo {
      width: 80%;
      height: 80%;
    }
  }
`;

export const NavLinks = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media screen and (max-width: 800px) {
    width: 80%;
  }
`;

export const NavLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`;

export const TabLang = styled.div`
  margin-left: 80px;
  margin-bottom: 5px;
`;

export const User = styled.div`
  margin-left: 30px;
`;