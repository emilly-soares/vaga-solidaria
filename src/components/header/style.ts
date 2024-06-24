import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.header`
  background-color: #5187F0;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
`;

export const GroupLogo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

export const Logo = styled.img`
  width: 100px;
  height: auto;
  margin-right: 10px;
`;

export const PlatformTitle = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  color: #FFF;
`;

export const LinksContainer = styled.nav`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
`;

export const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin-left: 30px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const CenteredLink = styled(Link)`
    margin: 0 3rem;
    color: white;
    text-decoration: none;
    font-weight: bold;
    cursor: pointer;

    &:hover {
    text-decoration: underline;
    }
`;

