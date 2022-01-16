import React, { ChangeEvent, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Player } from '../../types';
import Card from '../components/Card';
import Chat from '../components/Chat';
import Table from '../components/Table';
import { useGameContext, useSocketContext } from '../contexts';

const Game: React.FC = () => {
  const location = useLocation();
  const isHost = location.state && (location.state as any).creator;
  const { gameId } = useParams<{ gameId: string }>();
  const { username, players } = useGameContext();
  const { socket, pingRoom, ready } = useSocketContext();

  const handleReady = (id: string) => {
    console.log(id, socket?.id);
    if (id !== socket?.id) return;
    ready();
  };

  useEffect(() => {
    if (!username) pingRoom(gameId!);
  }, [socket]);

  return (
    <main>
      <Chat gameId={gameId!} />
      <TableWrapper>
        <Table />
      </TableWrapper>
      {!username && <UsernameModal gameId={gameId!} />}
      {/* isHost && <button>Start Game</button> */}
    </main>
  );
};
export default Game;

const UsernameModal: React.FC<{ gameId: string }> = ({ gameId }) => {
  const { joinRoom } = useSocketContext();
  const [username, setUsername] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    joinRoom(gameId, username);
  };
  return (
    <Modal>
      <StyledForm onSubmit={handleSubmit}>
        <h2>Join Game</h2>
        <div>
          <StyledInput
            placeholder="username"
            value={username}
            onChange={handleChange}
          />
          <button type="submit">Join</button>
        </div>
      </StyledForm>
    </Modal>
  );
};

const Modal = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.32);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledForm = styled.form`
  width: min(100%, 600px);
  background-color: ${({ theme }) => theme.color['white:0']};
  padding: 2rem;
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.borderRadius};

  > h2 {
    color: ${({ theme }) => theme.color.black};
    margin-bottom: 1rem;
    text-align: center;
  }

  > div {
    display: flex;

    > button {
      border: none;
      background-color: ${({ theme }) => theme.color.aero};
      margin-left: 1rem;
      padding: 0 1rem;
      font-size: 2rem;
    }
  }
`;

const StyledInput = styled.input`
  padding: 0 1rem;
  font-size: 2rem;
  flex: 1;

  ::placeholder {
    color: ${({ theme }) => theme.color.grey};
  }
`;

const TableWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
