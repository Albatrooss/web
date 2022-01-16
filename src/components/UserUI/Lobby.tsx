import React from 'react';
import styled from 'styled-components';
import { useSocketContext } from '../../contexts';

interface Props {
  host: boolean;
  isReady: boolean;
}

const Lobby: React.FC<Props> = ({ host, isReady }) => {
  const { ready } = useSocketContext();
  const handleReady = () => {
    if (host) {
      return;
    }
    ready();
  };
  return (
    <StyledButton ready={isReady} onClick={handleReady}>
      {host ? 'Start Game' : 'Ready'}
    </StyledButton>
  );
};
export default Lobby;

const StyledButton = styled.button<{ ready: boolean }>`
  border: none;
  background-color: ${({ theme, ready }) =>
    theme.color[ready ? 'green' : 'red']};
  color: ${({ theme }) => theme.color['white:0']};
  padding: 1rem 2rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: 3rem;

  cursor: pointer;
  transition: all 300ms ease;

  :hover {
    background-color: ${({ theme, ready }) =>
      theme.color[ready ? 'green:dark' : 'red:dark']};
  }
`;
