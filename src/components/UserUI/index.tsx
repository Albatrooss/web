import React from 'react';
import styled from 'styled-components';
import { useGameContext, useSocketContext } from '../../contexts';
import Scoreboard from '../Scoreboard';
import Hand from './Hand';
import Lobby from './Lobby';

interface Props {}

const UserUI: React.FC<Props> = ({}) => {
  const { gameData, me } = useGameContext();
  const { ready } = useSocketContext();

  const { hand, isReady } = me;
  const { host, gameOn } = gameData;

  const handleReady = (id: string) => {
    ready();
  };

  return (
    <Wrapper>
      {!gameOn ? (
        <Lobby host={host === me.id} isReady={isReady} />
      ) : (
        <Hand data={me} />
      )}
      <ScoreWrapper>
        <Scoreboard score={10} red={true} me />
      </ScoreWrapper>
    </Wrapper>
  );
};
export default UserUI;

const Wrapper = styled.div`
margin-top: 1rem;
  height: 200px;
  background-color: ${({ theme }) => theme.color['white:0']};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ScoreWrapper = styled.div`
  overflow: hidden;
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 2rem;
`;
