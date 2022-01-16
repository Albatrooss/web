import React from 'react';
import styled from 'styled-components';

interface comProps {}

const Navbar = ({}: comProps) => {
  return (
    <Wrapper>
      <Title>Euchre !</Title>
      <SubTitle></SubTitle>
    </Wrapper>
  );
};
export default Navbar;

const Wrapper = styled.div`
  position: fixed;
  background: #fff;
  padding: 1rem;
  box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.2);

`;

const Title = styled.div`
  font-family: 'Bubblegum Sans', cursive;
  color: ${({theme}) => theme.color.black};
  font-size: 3rem;
`;

const SubTitle = styled.div`
  font-family: 'Inter', sans-serif;
  color: ${({theme}) => theme.color.black};
  border-top: 1px solid #C3C3C3;
  text-align: center;
`;
