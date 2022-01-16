import React, { ChangeEvent, createRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  useChatContext,
  useGameContext,
  useSocketContext,
} from '../../contexts';

const ChatBox: React.FC = () => {
  const { sendChat } = useSocketContext();
  const { username } = useGameContext();
  const { msg, setMsg, chat } = useChatContext();

  const msgEndRef = createRef<HTMLDivElement>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMsg(e.target.value);
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendChat(msg);
    setMsg('');
  };

  // useEffect(() => {
  //   msgEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  // }, [chat]);

  return (
    <Wrapper>
      <ChatWrapper>
        {chat.map(msg => {
          const me = msg.username === username;
          const adminMsg = msg.username === '-';
          return (
            <ChatBubbleWrapper me={me} adminMsg={adminMsg}>
              {!(me || adminMsg) && <User>{msg.username}</User>}
              <ChatBubble me={me} adminMsg={adminMsg}>
                <Text>{msg.text}</Text>
              </ChatBubble>
            </ChatBubbleWrapper>
          );
        })}
        <div ref={msgEndRef} />
      </ChatWrapper>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput
          placeholder="Write your message here..."
          value={msg}
          onChange={handleChange}
        />
        <StyledButton type="submit">Send</StyledButton>
      </StyledForm>
    </Wrapper>
  );
};
export default ChatBox;

const Wrapper = styled.div`
  width: 100%;
  height: 66vh;
  background-color: ${({ theme }) => theme.color['white:0']};
  display: flex;
  flex-direction: column;
`;

const ChatWrapper = styled.div`
  padding: 1rem;
  overflow-y: scroll;
  flex: 1;
  display: flex;
  flex-direction: column-reverse;

`;

interface BubbleProps {
  me: boolean;
  adminMsg: boolean;
}

const ChatBubbleWrapper = styled.div<BubbleProps>`
  margin: 1rem ${({ me }) => (me ? 0 : 'auto')} 0
    ${({ me }) => (me ? 'auto' : 0)};
  width: 80%;
`;

const ChatBubble = styled.div<BubbleProps>`
  background-color: ${({ theme, me, adminMsg }) =>
    adminMsg ? 'none' : theme.color[me ? 'aero' : 'white']};
  padding: 1rem;
  color: ${({ theme, me }) =>
    me ? theme.color['white:0'] : theme.color.black};
  border-radius: 10px;
`;

const User = styled.span`
  font-size: 1rem;
  text-transform: capitalize;
  margin-left: 0.5rem;
  color: ${({ theme }) => theme.color.black};
`;

const Text = styled.p``;

const StyledForm = styled.form`
  display: flex;
`;
const StyledInput = styled.input`
  flex: 1;
  border: none;
  padding: 0 1rem;
  border-top: 1px solid ${({ theme }) => theme.color.white};

  ::placeholder {
    color: ${({ theme }) => theme.color.grey};
  }
`;

const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.color.aero};
  color: ${({ theme }) => theme.color['white:0']};
  font-weight: bold;
  border: none;

  transition: all 300ms ease;

  :hover {
    background-color: ${({ theme }) => theme.color['aero:dark']};
  }
`;
