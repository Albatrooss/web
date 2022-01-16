import React from 'react';
import styled from 'styled-components';
import { Title } from '../CreateGameForm';
import ChatBox from './ChatBox';

interface ChatProps {
  gameId: string;
}

const Chat: React.FC<ChatProps> = ({ gameId }) => {

  return (
    <Wrapper>
      {/* <Title>{gameId}</Title> */}
      <ChatBox />
    </Wrapper>
  )

}
export default Chat;

const Wrapper = styled.div`
  padding: 1rem;
  width: 400px;
  height: 100vh;
  background-color: ${({ theme }) => theme.color['white:dutch']};
`;

