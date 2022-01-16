import React, { ChangeEvent, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import CreateGameForm from '../components/CreateGameForm';
import MainPageArt from '../components/MainPageArt';
import { useGameContext, useSocketContext } from '../contexts';

const CreateLobby: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const state = location.state as any;
    if (state && state.error) alert(state.error);
  }, []);

  return (
    <main>
      {/* <button onClick={() => joinRoom('testing!')}>JOIN</button> */}
      {/* <button onClick={() => test()}>TEST</button> */}
      <CreateGameForm />
      <Wrapper>
        <div>
          <Title>Euchre !</Title>
          <SubTitle>by Tim</SubTitle>
        </div>
        <MainPageArt />
      </Wrapper>
    </main>
  );
};
export default CreateLobby;

const Title = styled.div`
  font-family: 'Bubblegum Sans', cursive;
  color: ${({ theme }) => theme.color.black};
  font-size: 7rem;
  text-align: center;
`;

const SubTitle = styled.div`
  font-family: 'Inter', sans-serif;
  color: ${({ theme }) => theme.color.black};
  border-top: 1px solid #c3c3c3;
  text-align: center;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
