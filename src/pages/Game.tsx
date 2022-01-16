import React, { ChangeEvent, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Player } from '../../types';
import Card from '../components/Card';
import Chat from '../components/Chat';
import { useGameContext, useSocketContext } from '../contexts';

const Game: React.FC = () => {
  const location = useLocation();
  const isHost = location.state && (location.state as any).creator;
  const { gameId } = useParams<{ gameId: string }>();
  const { username, players } = useGameContext();
  const { socket, pingRoom, ready } = useSocketContext();

  const handleReady = (id: string) => {
    console.log(id, socket?.id)
    if (id !== socket?.id) return;
    ready();
  };

  useEffect(() => {
    if (!username) pingRoom(gameId!);
  }, [socket]);

  return (
    <main>
      <Chat gameId={gameId!} />
      {/* <h1>WELCOME TO GAME {gameId}</h1>

      <ul>
        {players.map((player: Player) => (
          <li key={player.id}>
            {player.username}
            <button onClick={() => handleReady(player.id)}>
              {player.isReady ? 'ready' : 'not ready'}
            </button>
          </li>
        ))}
        </ul> */}
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
    <StyledForm onSubmit={handleSubmit}>
      USERNAME
      <input value={username} onChange={handleChange} />
      <button type="submit">Join Game</button>
    </StyledForm>
  );
};

const StyledForm = styled.form`

`;
