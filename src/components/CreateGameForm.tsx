import React, { ChangeEvent, useState } from 'react';
import styled, { ThemeConsumer } from 'styled-components';
import { useGameContext, useSocketContext } from '../contexts';
import { validateGameId, validateUsername } from '../util/validation';

const CreateGameForm: React.FC = () => {
  const { username, setUsername } = useGameContext();
  const { createRoom } = useSocketContext();

  const [gameId, setGameId] = useState('');
  const [errors, setErrors] = useState<{
    gameId: string | undefined;
    username: string | undefined;
  }>({ username: undefined, gameId: undefined });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'gameId') {
      setErrors(prev => ({
        ...prev,
        gameId: undefined
      }))
      setGameId(e.target.value);
      return;
    }
    setErrors(prev => ({
      ...prev,
      username: undefined
    }))
    setUsername(e.target.value);
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const gameIdError = validateGameId(gameId);
    const usernameError = validateUsername(username);
    if (gameIdError || usernameError) {
      setErrors({
        username: usernameError,
        gameId: gameIdError,
      });
      return;
    }
    createRoom(gameId);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Title>Create Game</Title>
      <StyledLabel>Lobby Name</StyledLabel>
      <StyledInput name="gameId" value={gameId} onChange={handleChange} autoComplete='off' />
      <Error>{errors.gameId}</Error>
      <StyledLabel>Username</StyledLabel>
      <StyledInput name="username" value={username} onChange={handleChange} autoComplete='off' />
      <Error>{errors.username}</Error>
      <StyledButton type="submit">CREATE</StyledButton>
    </StyledForm>
  );
};
export default CreateGameForm;

const StyledForm = styled.form`
  padding: 1rem;
  width: 400px;
  height: 100vh;
  background-color: ${({ theme }) => theme.color['white:dutch']};

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.div`
  font-family: 'Bubblegum Sans', cursive;
  color: ${({ theme }) => theme.color.black};
  font-weight: 600;
  font-size: 4rem;
  text-align: center;
  text-transform: capitalize;
  margin-bottom: 2rem;
`;

const StyledLabel = styled.label`
  width: 100%;
  font-size: 1.7rem;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 3rem;
  margin: 1rem 0;
  font-size: 1.6rem;
  padding: 0 1rem;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};

  transition: all 300ms ease;

  :hover {
    box-shadow: 0 0 10px ${({ theme }) => theme.color['aero:dark']};
  }
`;

const StyledButton = styled.button`
  width: 100%;
  height: 3rem;
  margin: 1rem 0;
  font-size: 1.6rem;
  padding: 0 1rem;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.color.aero};
  color: ${({ theme }) => theme.color['white:0']};
  cursor: pointer;

  transition: all 300ms ease;

  :hover {
    background-color: ${({ theme }) => theme.color['aero:dark']};
  }
`;

const Error = styled.div`
  color: ${({ theme }) => theme.color.red};
`;
